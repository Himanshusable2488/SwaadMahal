const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { cart, total } = req.body;

    db.query("INSERT INTO orders (total_amount) VALUES (?)",
        [total],
        (err, orderResult) => {
            if (err) return res.status(500).json(err);

            const orderId = orderResult.insertId;

            cart.forEach(item => {
                db.query(
                    "INSERT INTO order_items (order_id, item_name, price, quantity) VALUES (?, ?, ?, ?)",
                    [orderId, item.name, item.price, item.quantity]
                );
            });

            res.json({ message: "Order placed successfully" });
        }
    );
});

module.exports = router;