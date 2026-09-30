const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    title:    { type: String, required: [true, 'Title is required'], trim: true, maxlength: 80 },
    amount:   { type: Number, required: [true, 'Amount is required'], min: [0.01, 'Amount must be greater than 0'] },
    category: { type: String, enum: ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Other'], default: 'Other' },
    date:     { type: Date, default: Date.now },
    note:     { type: String, trim: true, maxlength: 200, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
