const nodemailer = require("nodemailer");

const Item = require("../models/item");
const Order = require("../models/order");
const User = require("../models/user");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

exports.index = async (req, res, next) => {};

exports.cart = (req, res, next) => {
  const { user, orders } = req.body;

  const newOrders = orders.map((o) => ({
    item: o.id,
    name: o.name,
    quantity: o.quantity
  }));

  const order = new Order({
    buyer: user,
    orders: newOrders
  });

  order.save(async (err) => {
    if (err) {
      console.error(err);
      return;
    }

    res.status(200).json({ message: "New Order added!" });

    console.log(`New Order ${order}`);

    newOrders.forEach(async (o) => {
      const updatedItemStocks = await Item.findByIdAndUpdate(o.item, {
        $inc: { stock: -o.quantity }
      });

      if (updatedItemStocks.stock <= 0) Item.findByIdAndRemove(o.item);

      console.log(updatedItemStocks);
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

    console.log("Found user: ", foundUser);

    const orderList = orders.reduce(
      (acc, currentValue, currentIndex) =>
        acc + `<li>${orders[currentIndex].name}</li>\n`,
      ""
    );

    console.log(orderList);

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
  });
};
