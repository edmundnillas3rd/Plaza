const nodemailer = require("nodemailer");

const { Item, ArchiveItem } = require("../models/item");
const Order = require("../models/order");
const User = require("../models/user");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

exports.index = async (req, res, next) => {

  const orders = await Order.find();

  res.status(200).json({
    orders
  });

};

exports.checkout_items = async (req, res, next) => {
  const { orders } = req.body;

  const itemIDs = orders.map(product => product.item);

  const items = await Item.find({ _id: { "$all": itemIDs }  })

  const stripeLineItems = orders.map(product => {
    const foundItem = items.find(item => item.id === product.item);
    return {
      price: foundItem.stripe_price_id,
      quantity: product.quantity
    }
  })

  // const totalAmount = queriedOrders.orders.reduce((accumulator, currentValue, currentIndex, orders) => {
  //   return accumulator + (orders[currentIndex].item.price * orders[currentIndex].quantity);
  // }, 0);

  const session = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}`,
    cancel_url: `${process.env.CLIENT_URL}`
  })

  res.status(200).json({
    url: session.url
  })
};

exports.checkout_webhook = async (req, res) => {
  const payload = req.body;

  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    );

    const lineItems = sessionWithLineItems.line_items;

    let orders = await lineItems.data.map(async item => {
      const foundItem = await Item.find({ stripe_product_id: item.price.product });
      return {
        item: foundItem[0].id,
        quantity: item.quantity
      }
    });

    orders = await Promise.all(orders);

    const buyer = await User.find({ email: event.data.object.customer_details.email });

    const order = new Order({
      buyer: buyer[0].id,
      orders: orders
    });

    let newOrders = await order.save();
    newOrders = await newOrders.populate("orders.item");
    newOrders.orders.forEach(async (o) => {
      const foundItem = await Item.findById(o.item);
      if (foundItem.stock === 0)
      {
        const archivedItem = new ArchiveItem({
          name: foundItem.name,
          seller: foundItem.seller,
          price: foundItem.price,
          stripe_price_id: foundItem.stripe_price_id,
          stripe_product_id: foundItem.stripe_product_id,
          description: foundItem.description,
          stock: foundItem.stock,
          reviews: foundItem.reviews,
          category: foundItem.category,
          image: {
            urls: [...foundItem.image.urls]
          }
        });
        await archivedItem.save();
        await foundItem.delete();
        await stripe.prices.update(archivedItem.stripe_price_id, {
          active: false
        });
        await stripe.products.update(archivedItem.stripe_product_id, {
          active: false
        });
      }
      else
      {
        await Item.findByIdAndUpdate(o.item, {
          $inc: { stock: -o.quantity }
        });
      }
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

    const queriedOrders = await newOrders.populate("orders.item");
    const orderList = queriedOrders.orders.reduce(
      (acc, currentValue, currentIndex, array) =>
        acc + `<li>${array[currentIndex].item.name}</li>\n`,
      ""
    );

    let message = {
      from: process.env.GMAIL_USER,
      to: buyer[0].email,
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
  }

  res.status(200).end();
}