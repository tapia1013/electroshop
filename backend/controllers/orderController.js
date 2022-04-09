import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


// @desc     Create new order
// @route    POST /api/orders
// @access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  // Make sure order items is not empty
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Order Items')
    return;
  } else {
    // create new order in the database
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    // save in database
    const createdOrder = await order.save();

    res.status(201).json(createdOrder)
  }


})



export {
  addOrderItems
}