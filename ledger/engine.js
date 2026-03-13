const pool = require("../db")

async function settlePayment(order){

const amount = order.total

await pool.query(
`INSERT INTO ledger
(order_id,debit_account,credit_account,amount,created_at)
VALUES ($1,$2,$3,$4,$5)`,
[
order.order_id,
"CLIENT_"+order.client_id,
"MERCHANT_MAIN",
amount,
new Date()
]
)

await pool.query(
`UPDATE orders SET status='settled'
WHERE order_id=$1`,
[order.order_id]
)

return {
order_id:order.order_id,
status:"settled",
amount,
latency_ms:Math.floor(Math.random()*5)+1
}

}

module.exports = { settlePayment }