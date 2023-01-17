const Item = require("../models/item");
const Order = require("../models/order");

exports.index = (req, res, next) => {};

exports.cart = async (req, res, next) => {
  const { user, orders } = req.body;

  const newOrders = orders.map((o) => ({ item: o.id, quantity: o.quantity }));

  const order = await new Order({
    buyer: user,
    orders: newOrders
  });

  order.save((err) => {
    if (err) {
      console.error(err);
      return;
    }

    res.status(200).json({ message: "New Order added!" });

    console.log(`New Order ${order}`);

    newOrders.forEach(async (o) => {
      const updatedStocks = await Item.findByIdAndUpdate(o.item, {
        $inc: { stock: -o.quantity }
      });
      console.log(updatedStocks);
    });
  });
};
