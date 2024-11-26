const mongoose = require('mongoose');

// Define the Costume Schema
const costumeSchema = new mongoose.Schema({
    name: {
        type: [String],
        required: true, // Ensures that the name field is mandatory
        trim: true, // Removes leading/trailing whitespace
    },
    style: {
        type: String,
        required: true, // Ensures that the style field is mandatory
        enum: [
            'Lyrical',
            'Contemporary',
            'Ballet',
            'Jazz',
            'Hip Hop',
            'Musical Theater',
        ], // Only allows specific predefined styles
    },
    size: {
        type: String,
        required: true, // Ensures that the size field is mandatory
        enum: [
            'CXS',
            'CS',
            'CM',
            'CL',
            'CXL',
            'AXS',
            'AS',
            'AM',
            'AL',
            'AXL',
            'No_Match',
        ], // Only allows specific predefined sizes
    },
    color: {
        type: String,
        required: true, // Ensures that the color field is mandatory
        trim: true, // Removes leading/trailing whitespace
    },
    description: {
        type: String,
        required: false, // Optional description
        trim: true, // Removes leading/trailing whitespace
    },
    details: {
        type: String,
        required: false, // Optional description
        trim: true, // Removes leading/trailing whitespace
    },
    main_image: {
        type: String,
        required: false,
    },
    images: {
        type: [String],
        required: false,
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
});

// Compile the Schema into a Model
const Costume = mongoose.model('Costume', costumeSchema);

// Export the Costume Model
module.exports = Costume;
