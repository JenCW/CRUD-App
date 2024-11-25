const express = require('express');
const router = express.Router();
const costumeController = require('../controllers/costumeController');


//ROUTES=====================================================================================================
router.get('/', costumeController.index); // GET all costumes
router.get('/new', costumeController.newCostume); // GET form to create new costume
router.get('/:id', costumeController.show); // GET one specific costume
router.post('/', costumeController.create);            // POST create and add new costume to database
router.get('/:id/edit', costumeController.edit);       // GET form to edit one specific costume
router.put('/:id', costumeController.update);         // PUT update one specific costume
router.delete('/:id', costumeController.deleteCostume);      // DELETE one specific costume

module.exports = router; // Export the router object for use in the server.js file