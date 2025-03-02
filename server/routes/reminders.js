const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all reminders
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reminders ORDER BY deadline ASC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single reminder
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reminders WHERE id = ?', [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching reminder:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a reminder
router.post('/', async (req, res) => {
    const { activity, deadline, department_responsible, event } = req.body;

    if (!activity || !deadline || !department_responsible) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO reminders (activity, deadline, department_responsible, event) VALUES (?, ?, ?, ?)',
            [activity, deadline, department_responsible, event || 'General']
        );

        const newReminderId = result.insertId;
        const [rows] = await db.query('SELECT * FROM reminders WHERE id = ?', [newReminderId]);

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating reminder:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a reminder
router.put('/:id', async (req, res) => {
    const { activity, deadline, department_responsible, event } = req.body;
    const reminderId = req.params.id;

    if (!activity || !deadline || !department_responsible) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const [result] = await db.query(
            'UPDATE reminders SET activity = ?, deadline = ?, department_responsible = ?, event = ? WHERE id = ?',
            [activity, deadline, department_responsible, event || 'General', reminderId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        const [rows] = await db.query('SELECT * FROM reminders WHERE id = ?', [reminderId]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating reminder:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a reminder
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM reminders WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        res.json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;