const mongoose = require('mongoose');

const CostumeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    style: { type: String, required: true },  // e.g., "lyrical", "contemporary", "jazz"
    size: { type: String, required: true },  // e.g., "CS: Child small", "AM: Adult Medium",
    color: { type: String, required: true }, // e.g., "red", "blue", "green"
    description: { type: String, required: true},           // Additional details
});

module.exports = mongoose.model('Costumes', CostumeSchema);
