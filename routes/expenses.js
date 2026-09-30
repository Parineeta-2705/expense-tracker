const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

// CREATE  POST /api/expenses
router.post('/', async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL  GET /api/expenses?category=Food
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const expenses = await Expense.find(filter).sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SUMMARY  GET /api/expenses/summary  (total + per-category totals)
router.get('/summary', async (req, res) => {
  try {
    const byCategory = await Expense.aggregate([
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    const total = byCategory.reduce((s, c) => s + c.total, 0);
    res.json({ total, byCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE  GET /api/expenses/:id
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: 'Invalid expense id' });
  }
});

// UPDATE  PUT /api/expenses/:id
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE  DELETE /api/expenses/:id
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid expense id' });
  }
});

module.exports = router;
