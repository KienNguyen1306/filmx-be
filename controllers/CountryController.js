// controllers/CountryController.js
const Country = require('../models/Country');

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching countries' });
  }
};

exports.createCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const country = await Country.create({ name });
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ error: 'Error creating country' });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const countryId = req.params.id;
    const { name } = req.body;
    const [updatedRowsCount, updatedCountries] = await Country.update(
      { name },
      { where: { id: countryId }, returning: true }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.status(200).json(updatedCountries[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating country' });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const countryId = req.params.id;
    const deletedRowCount = await Country.destroy({ where: { id: countryId } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting country' });
  }
};
