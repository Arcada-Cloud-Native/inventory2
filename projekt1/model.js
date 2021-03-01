const mongoose = require('mongoose');

const model = mongoose.Schema({
    _id: { type: String, required: true },
    StockHel: { type: Number, required: true },
    StockTur: { type: Number, required: true },
    StockJyv: { type: Number, required: true}
});

module.exports = mongoose.model('model', model);