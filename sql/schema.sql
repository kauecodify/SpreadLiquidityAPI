CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50),
    client_id VARCHAR(50),
    product_id VARCHAR(50),
    value NUMERIC,
    quantity INTEGER,
    total NUMERIC,
    payment_method VARCHAR(20),
    status VARCHAR(20),
    created_at TIMESTAMP
);

CREATE TABLE ledger (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50),
    debit_account VARCHAR(50),
    credit_account VARCHAR(50),
    amount NUMERIC,
    created_at TIMESTAMP
);