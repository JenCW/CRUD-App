const mongoose = require('mongoose'); // Import mongoose for database connection
const fs = require('fs'); // Import fs for file system operations - allows you to perform  file operations, i.e  reading from/ writing to files, creating and deleting files and directories, etc
const csvparser = require('csv-parser'); // Import csv-parser which converts the CSV data into a format that can be processed by the function.
const Costume = require('./models/costumes'); // Import the Costume Model

require('dotenv').config(); // Import dotenv for environment variables


// MONGO DB CONNECTION =================================================================================================
mongoose.connect(process.env.MONGODB_URI, {
});
mongoose.connection.on('connected', () => {
        console.log(`Connected to MongoDB ${mongoose.connection.name}`);
    });


// IMPORT CSV DATA FROM CATALOGUE =================================================================================================
const importCatalogue = (filePath) => {                         // Define the  function (filepath: parameter specifying the path to the file to be imported)
    const costumes = [];                                        // Create an array to store the imported costumes
    fs.createReadStream(filePath)                               // Method used to read the files from the file
    .pipe(csvparser())                                          // Method used to Parse the CSV data
    .on('data', (row) => {                                      // part of the fs.createReadStream method, and cvsparser method.  It acts as a mediary and registers a callback function each time a  row  is read
        costumes.push({                                         // Method to Push  data into the costumes array
            name: row.Name,                                     // Property being parsed from the file and assigned to the Model property
            style: row.Style,                                   // Property being parsed from the file and assigned to the Model property
            size: row.Size,                                     // Assign the data to the respective properties
            color: row.Color,                                   // Assign the data to the respective properties
            description: row.Description                        // Assign the data to the respective properties
        });
        })
    .on('end', async () => {    // When the parsing is complete
        try {
            await Costume.insertMany(costumes); // Insert the costumes into the database
            console.log('Catalogue imported successfully');
            mongoose.connection.close(); // Close the database connection
        } catch (error) {
            console.error(`Error importing catalogue: ${error}`);
            mongoose.connection.close(); // Close the database connection
            }
    });
};

//RUN THE IMPORTCATALOGUE FUNCTION
importCatalogue('./data/costumeCatalogue.csv');
