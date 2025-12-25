const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    initializeData();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Import models
const { User, Vehicle, ServicePackage, Booking, Payment } = require('./models/index');

// Initialize sample data
async function initializeData() {
  try {
    const packageCount = await ServicePackage.countDocuments();
    if (packageCount === 0) {
      await ServicePackage.insertMany([
        { packageId: 1, name: 'Basic Service', price: 899, description: 'Oil Change, Basic Inspection, Tire Check' },
        { packageId: 2, name: 'Full Service', price: 1499, description: 'Complete Inspection, Oil & Filter Change, Brake Check' },
        { packageId: 3, name: 'Repair Service', price: 'Custom', description: 'Diagnostic Check, Custom Repairs, Parts Replacement' }
      ]);
      console.log('Sample service packages created');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Routes

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Get next userId
    const lastUser = await User.findOne().sort({ userId: -1 });
    const userId = lastUser ? lastUser.userId + 1 : 1;
    
    const user = new User({ userId, name, email, phone, password });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully', userId, name, email, phone });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({ message: 'Login successful', userId: user.userId, name: user.name, email: user.email, phone: user.phone, address: user.address });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Get User Profile
app.get('/api/user/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ userId: user.userId, name: user.name, email: user.email, phone: user.phone, address: user.address });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Update User Profile
app.put('/api/user/:userId', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { name, email, phone, address },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Get User Vehicles
app.get('/api/user/:userId/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.params.userId });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
});

// Add Vehicle
app.post('/api/user/:userId/vehicles', async (req, res) => {
  try {
    const { brand, model, numberPlate, year } = req.body;
    
    // Get next vehicleId
    const lastVehicle = await Vehicle.findOne().sort({ vehicleId: -1 });
    const vehicleId = lastVehicle ? lastVehicle.vehicleId + 1 : 1;
    
    const vehicle = new Vehicle({
      vehicleId,
      userId: parseInt(req.params.userId),
      brand,
      model,
      numberPlate,
      year
    });
    
    await vehicle.save();
    res.status(201).json({ message: 'Vehicle added successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle', error: error.message });
  }
});

// Get Service Packages
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await ServicePackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error: error.message });
  }
});

// Create Booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { userId, vehicleId, packageId, serviceType, serviceDate, timeSlot, pickupRequired } = req.body;
    
    // Get next bookingId
    const lastBooking = await Booking.findOne().sort({ bookingId: -1 });
    const bookingId = lastBooking ? lastBooking.bookingId + 1 : 1;
    
    const booking = new Booking({
      bookingId,
      userId,
      vehicleId,
      packageId,
      serviceType,
      serviceDate,
      timeSlot,
      pickupRequired
    });
    
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Get User Bookings
app.get('/api/user/:userId/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Process Payment
app.post('/api/payments', async (req, res) => {
  try {
    const { bookingId, amount, paymentMode } = req.body;
    
    // Get next paymentId
    const lastPayment = await Payment.findOne().sort({ paymentId: -1 });
    const paymentId = lastPayment ? lastPayment.paymentId + 1 : 1;
    
    const payment = new Payment({
      paymentId,
      bookingId,
      amount,
      paymentMode,
      paymentStatus: 'Success',
      transactionId: `TXN${Date.now()}`
    });
    
    await payment.save();
    
    // Update booking with paymentId
    await Booking.findOneAndUpdate(
      { bookingId },
      { paymentId, status: 'Completed' }
    );
    
    res.status(201).json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Payment processing failed', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});