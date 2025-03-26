import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderModel = model("Order", orderSchema);
export default OrderModel;
