import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    deliveryOptions: { type: String, required: true },
    deliveryAddress: { type: String },
    isDelivered: { type: Boolean, required: true },
    paymentOptions: { type: String, required: true },
    isPaid: { type: Boolean, required: true },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      qty:{ type: Number, required: true }
    }],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);