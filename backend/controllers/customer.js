const Customer = require('../models/customer');

// exports.createCustomer = async (req, res) => {
//   try {

//     const {
//       title,
//       firstName,
//       lastName,
//       gender,
//       address,
//       phoneNumber,
//       avatar,
//       email,
//       password
//     } = req.body;

//     const newCustomer = new Customer({
//       title,
//       firstName,
//       lastName,
//       gender,
//       address,
//       phoneNumber,
//       avatar,
//       email,
//       password
//     });

//     // Save the new customer to the database
//     const savedCustomer = await newCustomer.save();

//     // Respond with the newly created customer
//     res.status(201).json(savedCustomer);
//   } catch (err) {
//     console.error('Error creating customer:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getCustomerByID = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (err) {
    console.error('Error fetching customer by ID:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
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

    // Find the customer by ID and update
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id, 
      {
        title,
        firstName,
        lastName,
        gender,
        address,
        phoneNumber,
        avatar,
        email,
        password
      }, 
      { new: true } // Option to return the updated document
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(updatedCustomer);
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ message: err.message });
  }
};
