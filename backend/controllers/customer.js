const Customer = require('../models/customer');

exports.createCustomer = async (req, res) => {
  try {

    const {
      title,
      firstName,
      lastName,
      gender,
      address,
      phoneNumber,
      avatar,
      email,
      password
    } = req.body;

    const newCustomer = new Customer({
      title,
      firstName,
      lastName,
      gender,
      address,
      phoneNumber,
      avatar,
      email,
      password
    });

    // Save the new customer to the database
    const savedCustomer = await newCustomer.save();

    // Respond with the newly created customer
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ message: err.message });
  }
};
