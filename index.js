import express, { response } from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import itemsRoute from "./routes/itemsRoute.js"
import cors from "cors"

const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for parsing request CORS POLICY
// OPtion:1 Allow all origins with default cors (*)
app.use(cors())
// Option:2: Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     method: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// )

app.get("/", (request, response) => {
  console.log(request)
  return response.status(234).send("Welcome to item store")
})

app.use("/items", itemsRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to database`)
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
