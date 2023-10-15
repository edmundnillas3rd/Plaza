const nodemailer = require("nodemailer");

const Item = require("../models/item");
const Order = require("../models/order");
const User = require("../models/user");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

exports.index = async (req, res, next) => {};

exports.checkout_items = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      message: "Not Authenticated"
    });
    return;
  }

  const { user, orders } = req.body;

  const order = new Order({
    buyer: user,
    orders: orders
  });

  const newOrders = await order.save();

  const queriedOrders = await newOrders.populate("orders.item");

  const stripeLineItems = queriedOrders.orders.map(order => ({
    price: order.item.stripe_price_id,
    quantity: order.quantity
  }))

  const totalAmount = queriedOrders.orders.reduce((accumulator, currentValue, currentIndex, orders) => {
    return accumulator + (orders[currentIndex].item.price * orders[currentIndex].quantity);
  }, 0);

  const stripePaymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: "usd",
    payment_method_types: ["card"]
  })

  const session = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}`,
    cancel_url: `${process.env.CLIENT_URL}`
  })

  const { paymentIntent } = await stripe.confirmCardPayment(stripePaymentIntent.id);

  if (paymentIntent && paymentIntent.status === "succeeded")
  {
    newOrders.orders.forEach(async (o) => {
      const updatedItemStocks = await Item.findByIdAndUpdate(o.item, {
        $inc: { stock: -o.quantity }
      });
  
      if (updatedItemStocks.stock <= 0) Item.findByIdAndRemove(o.item);
    });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "stmp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  
    const foundUser = await User.findById(user);
  
    const orderList = queriedOrders.orders.reduce(
      (acc, currentValue, currentIndex, array) =>
        acc + `<li>${array[currentIndex].name}</li>\n`,
      ""
    );
  
    let message = {
      from: process.env.GMAIL_USER,
      to: foundUser.email,
      subject: "Plaza Order Receipt",
      html: `
            <h3>This is your order</h3>
            <br>
            <p>Orders:</p>
            <ul>
              ${orderList}
            </ul>
          `
    };
  
    transporter.sendMail(message);
  
    res.status(200).json({
      url: session.url
    });
  }
  else {
    res.status(200).json({
      url: session.url
    })
  }

};