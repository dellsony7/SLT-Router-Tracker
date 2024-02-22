import mongoose from "mongoose"

const itemSchema = mongoose.Schema(
  {
    itemCode: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
    },
    rider: {
      type: String,
      required: true,
    },
    // location: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
)

export const Item = mongoose.model("Item", itemSchema)
