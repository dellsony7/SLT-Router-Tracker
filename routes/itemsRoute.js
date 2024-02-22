import express from "express"
import { Item } from "../models/itemModels.js"

const router = express.Router()

// Route for save a new item or update an existing one
router.post("/edit", async (request, response) => {
  try {
    const { itemCode, deliveryStatus, rider } = request.body

    // Validate required fields
    if (!itemCode || !deliveryStatus || !rider) {
      return response.status(400).send({
        message: "Send all required fields: Item Code, Delivery Status, Rider",
      })
    }

    // Check if an item with the same itemCode exists
    const existingItem = await Item.findOne({ itemCode })

    if (existingItem) {
      // If exists, update the item
      const updatedItem = await Item.findOneAndUpdate(
        { itemCode },
        { deliveryStatus, rider },
        { new: true }
      )

      return response.status(200).send({
        message: "Item updated successfully",
        item: updatedItem,
      })
    } else {
      // If not exists, create a new item
      const newItem = {
        itemCode,
        deliveryStatus,
        rider,
      }

      const createdItem = await Item.create(newItem)

      return response.status(201).send({
        message: "Item created successfully",
        item: createdItem,
      })
    }
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for scanner
router.post("/scan", async (request, response) => {
  try {
    const { itemCode, deliveryStatus, rider } = request.body

    // Validate required fields
    if (!itemCode || !deliveryStatus || !rider) {
      return response.status(400).send({
        message: "Send all required fields: Item Code, Delivery Status, Rider",
      })
    }

    // Check if an item with the same itemCode exists
    const existingItem = await Item.findOne({ itemCode })

    if (existingItem) {
      // If exists, update the item
      const updatedItem = await Item.findOneAndUpdate(
        { itemCode },
        { deliveryStatus, rider },
        { new: true }
      )

      return response.status(200).send({
        message: "Item updated successfully",
        item: updatedItem,
      })
    } else {
      // If not exists, create a new item
      const newItem = {
        itemCode,
        deliveryStatus,
        rider,
      }

      const createdItem = await Item.create(newItem)

      return response.status(201).send({
        message: "Item created successfully",
        item: createdItem,
      })
    }
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})
//Route for save a new item
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.itemCode ||
      !request.body.deliveryStatus ||
      !request.body.rider
    ) {
      return response.status(400).send({
        message: "Send all required fields: Item Code, Delivery Status, Rider",
      })
    }
    const newItem = {
      itemCode: request.body.itemCode,
      deliveryStatus: request.body.deliveryStatus,
      rider: request.body.rider,
    }
    const item = await Item.create(newItem)
    return response.status(201).send(item)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})


// Route for get all items from database
router.get("/", async (request, response) => {
  try {
    const items = await Item.find({})
    return response.status(200).json({
      count: items.length,
      data: items,
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

//Route for get one item from database by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params
    const item = await Item.findById(id)
    return response.status(200).json({ item })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

//Route for update an item
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.itemCode ||
      !request.body.deliveryStatus ||
      !request.body.rider
    ) {
      return response.status(400).send({
        message: "Send all required fields: Item Code, Delivery Status, Rider",
      })
    }

    const { id } = request.params
    const result = await Item.findByIdAndUpdate(id, request.body)

    if (!result) {
      return response.status(400).json({ message: "Item not found" })
    }

    return response
      .status(200)
      .send({ message: "Item updated successfully", item: result })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for Delete a item
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params
    const result = await Item.findByIdAndDelete(id)
    if (!result) {
      return response.status(404).json({ message: "Item not found" })
    }
    return response
      .status(200)
      .send({ message: "Item deleted successfully", item: result })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

export default router
