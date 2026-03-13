// npm install xlsx

const pool = require("../db")
const fs = require("fs")
const path = require("path")

function createDayFolder() {

    const today = new Date().toISOString().split("T")[0]

    const dir = path.join(process.cwd(), "logs", today)

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    return dir
}

async function createOrder(data) {

    const XLSX = require("xlsx")

    const order_id = "ORD" + Math.floor(Math.random() * 100000)

    const total = data.value * data.quantity

    const order = {
        order_id,
        client_id: data.client_id,
        product_id: data.product_id,
        value: data.value,
        quantity: data.quantity,
        total,
        payment_method: data.payment_method,
        status: "pending",
        created_at: new Date()
    }

    await pool.query(
        `INSERT INTO orders
(order_id,client_id,product_id,value,quantity,total,payment_method,status,created_at)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
            order.order_id,
            order.client_id,
            order.product_id,
            order.value,
            order.quantity,
            order.total,
            order.payment_method,
            order.status,
            order.created_at
        ]
    )

    function saveExcel(order, folder) {

        const file = path.join(folder, "orders.xlsx")

        let data = []

        if (fs.existsSync(file)) {

            const workbook = XLSX.readFile(file)
            const sheet = workbook.Sheets["orders"]

            data = XLSX.utils.sheet_to_json(sheet)

        }

        data.push(order)

        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, "orders")

        XLSX.writeFile(workbook, file)

    }

    const folder = createDayFolder()

    fs.writeFileSync(
        path.join(folder, order_id + ".json"),
        JSON.stringify(order, null, 2)
    )

    saveExcel(order, folder)
    return order
}

module.exports = { createOrder }