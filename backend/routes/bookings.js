const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE BOOKING
router.post('/', (req, res) => {
    const { name, email, phone, date, time, guests, occasion, specialRequests } = req.body;

    const sql = `
        INSERT INTO bookings 
        (name, email, phone, booking_date, booking_time, guests, occasion, special_requests)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, email, phone, date, time, guests, occasion, specialRequests], 
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Booking saved successfully' });
        }
    );
});

// GET ALL BOOKINGS
router.get('/', (req, res) => {
    db.query("SELECT * FROM bookings ORDER BY booking_date, booking_time", 
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        }
    );
});

// DELETE BOOKING
router.delete('/:id', (req, res) => {
    db.query("DELETE FROM bookings WHERE id = ?", [req.params.id], 
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Booking deleted" });
        }
    );
});

module.exports = router;