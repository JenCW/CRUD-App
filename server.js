const express = require('express');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');

dotenv.config();
// const bodyParser = require('body-parser');



const PORT = process.env.PORT; // Define the port to be used by the server from the environment variables (process.env)
if (!PORT) { // Check if PORT is not defined in the environment variables (process.env)
    console.error("Error: PORT is not defined in the environment variables."); // Log an error message to the console if PORT is not defined
    process.exit(1); // Exit the process with an error code
}

//MIDDLEWARE
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(methodOverride('_method')); // Middleware to override the HTTP method using a query value in the _method parameter
app.set('view engine', 'ejs'); // Set the view engine to EJS (Embedded JavaScript) for rendering views

//MONGO DB CONNECTION
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});

//IMPORT ROUTES FROM ROUTES/COSTUMES.JS
const costumeRoutes = require('./routes/costumes'); // Import the costume routes from the routes/costumes.js file
app.use('/costumes', costumeRoutes); // Use the costume routes in the /costumes route of the server


app.get('/', (req, res) => {  // Define a route to handle GET requests to the root URL
    res.redirect('/costumes'); // Redirect to the costumes index
});

app.use((req, res) => { // Define a route to handle 404 errors
    res.status(404).send("Page Not Found"); // Send a 404 status code and a message to the client
});



app.listen(PORT, () => { // Start the server on the specified port and log a message to the console when the server is running
    console.log(`Server is running on http://localhost:${PORT}`);
});