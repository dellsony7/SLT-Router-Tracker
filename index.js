import express, { response } from "express"
import mongoose from "mongoose"
import itemsRoute from "./routes/itemsRoute.js"
import cors from "cors"
import dotenv from "dotenv"

//
dotenv.config()
const app = express()
const PORT = 3002
const mongoDBURL =
  "mongodb+srv://delsanidissanayaka7:90ZrrCKMrGG7J2bY@cluster0.jaiczjb.mongodb.net/?retryWrites=true&w=majority"

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
