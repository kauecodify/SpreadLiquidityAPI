const express = require("express")
const cors = require("cors")

const { createOrder } = require("./services/orders")
const { processPayment } = require("./services/payments")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/orders", async (req,res)=>{

const order = await createOrder(req.body)

res.json(order)

})

app.post("/payments/:order_id", async (req,res)=>{

const settlement = await processPayment(req.params.order_id)

res.json({
message:"payment approved",
settlement
})

})

app.listen(3000,()=>{
console.log("API rodando http://localhost:3000")
})