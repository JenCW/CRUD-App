const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsLayouts = require('express-ejs-layouts'); // Import express-ejs-layouts
const Costume = require('./models/costumes'); // Ensure you import your model
const path = require('path'); // Import the path module from Node.js core  to work with file and directory paths

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT; // Define the port to be used by the server from the environment variables (process.env)
if (!PORT) { // Check if PORT is not defined in the environment variables (process.env)
    console.error("Error: PORT is not defined in the environment variables."); // Log an error message to the console if PORT is not defined
    process.exit(1); // Exit the process with an error code
}


const app = express();
app.set('view engine', 'ejs'); // Set the view engine to EJS (Embedded JavaScript) for rendering views

//MIDDLEWARE
app.use(ejsLayouts); // Use express-ejs-layouts middleware
app.set('layout', 'layouts/layout'); // Set default layout file (layout
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(methodOverride('_method')); // Middleware to override the HTTP method using a query value in the _method parameter


//MONGO DB CONNECTION
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});

//IMPORT ROUTES FROM ROUTES/COSTUMES.JS
const costumeRoutes = require('./routes/costumes'); // Import the costume routes from the routes/costumes.js file
app.use('/costumes', costumeRoutes); // Use the costume routes in the /costumes route of the server
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('landing'); // Render the landing view
});


app.use((req, res) => { // Define a route to handle 404 errors
    res.status(404).send("Page Not Found"); // Send a 404 status code and a message to the client
});

app.get('/dashboard', async (req, res) => {
    try {
        const totalCostumes = await Costume.countDocuments();
        console.log('Total Costumes:', totalCostumes);

        const groupedByStyle = await Costume.aggregate([
            { $group: { _id: '$style', count: { $sum: 1 } } },
        ]);
        console.log('Grouped by Style:', groupedByStyle);

        res.render('dashboard', { totalCostumes, groupedByStyle });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => { // Start the server on the specified port and log a message to the console when the server is running
    console.log(`Server is running on http://localhost:${PORT}`);
});