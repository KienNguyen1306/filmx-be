// routes/countryRoutes.js
const express = require('express');
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

const CountryController = require('../controllers/CountryController');

const router = express.Router();

router.get('/', CountryController.getCountries); // GET all countries
router.post('/', isAuthenticated, isAdmin, CountryController.createCountry); // CREATE a country
router.put('/:id', isAuthenticated, isAdmin, CountryController.updateCountry); // UPDATE a country
router.delete('/:id', isAuthenticated, isAdmin, CountryController.deleteCountry); // DELETE a country

module.exports = router;
