import OrderModel from "../models/orderSchema.js";

//GET all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find();
    res.send({ sucsess: true, data: orders });
  } catch (err) {
    next(err);
  }
};

//GET single order
export const getSingleOrder = async (req, res, next) => {
  try {
    const singleOrder = await OrderModel.findById(req.params.id);
    res.send({ sucsess: true, data: singleOrder });
  } catch (err) {
    next(err);
  }
};

//POST order
export const createNewOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.create(req.body);
  } catch (err) {
    next(err);
  }
};
//PATCH updating single order
export const updateSingleOrder = async (req, res, next) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ success: true, data: updatedOrder });
  } catch (err) {
    next(err);
  }
};

//DELETE single order
export const deleteSingleOrder = async (req, res, next) => {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);
    res.send({ success: true, data: deletedOrder });
  } catch (err) {
    next(err);
  }
};
