const pool = require("../db")
const { settlePayment } = require("../ledger/engine")

async function processPayment(order_id){

const result = await pool.query(
`SELECT * FROM orders WHERE order_id=$1`,
[order_id]
)

const order = result.rows[0]

if(!order){
throw new Error("order not found")
}

await pool.query(
`UPDATE orders SET status='paid'
WHERE order_id=$1`,
[order_id]
)

const settlement = await settlePayment(order)

return settlement
}

module.exports = { processPayment }