const Costume = require('../models/costumes');

// COSTUME CONTROLLER FUNCTIONS=======================================================================================================================

//INDEX: Get all Costumes
const index = async (req, res) => {
    const costumes = await Costume.find({}); // Get all costumes from the database
    res.render('costumes/index', { costumes }); // Render the index.ejs view, passing the costumes object to the view
}

//NEWCOSTUME:  Display the  form to create new costume
const newCostume = async(req, res) => {
    res.render('costumes/new'); // Render the new.ejs view
}

// SHOW: Get a specific costume
const show = async (req, res) => {
    const costume = await Costume.findById(req.params.id); // Fetch the costume
    res.render('costumes/show', { costume }); // Render the show view
  };

//CREATE:  Add new costume to the database
const create = async(req, res) => {
    await Costume.create(req.body); // Create a new costume in the database
    res.redirect('/costumes'); // Redirect to the index route after creating a new costume
}

//EDIT: Display the form to edit a specific costume
const edit = async (req, res) => {
    const costume = await Costume.findById(req.params.id); // Find the specific costume by id
    res.render('costumes/edit', { costume }); // Render the edit.ejs view, passing the costume object to the view
}

//UPDATE: Update a costIME in the database
const update = async (req, res) => {
    await Costume.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the costume
    res.redirect(`/costumes/${req.params.id}`); // Redirect to the correct show view

  };

//DELETE: Delete a costume
  const deleteCostume = async (req, res) => {
    await Costume.findByIdAndDelete(req.params.id); // Delete the costume
    res.redirect('/costumes'); // Redirect to index
  };

  module.exports = {index, newCostume, show, create, edit, update, deleteCostume}; // Export the costume controller objects for use in the routes/costumes.js file