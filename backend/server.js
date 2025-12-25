require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { User, Vehicle, ServicePackage, Booking, Payment, AdminLog } = require('./models');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Initialize data if collections are empty
const initializeData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany([
        { userId: 1, name: "Divakar G", email: "divakar@example.com", phone: "9876543210", address: "Coimbatore, Tamil Nadu", role: "customer" },
        { userId: 2, name: "Admin User", email: "admin@example.com", phone: "9998887776", address: "Coimbatore", role: "admin" }
      ]);

      await Vehicle.insertMany([
        { vehicleId: 101, userId: 1, brand: "Honda", model: "Activa 6G", numberPlate: "TN37AB1234", year: 2021 },
        { vehicleId: 102, userId: 1, brand: "Hyundai", model: "i20", numberPlate: "TN38XY9090", year: 2019 }
      ]);

      await ServicePackage.insertMany([
        { packageId: 1, name: "Basic Service", price: 899, description: "Oil change, water wash, general check-up" },
        { packageId: 2, name: "Full Service", price: 1499, description: "Full inspection, oil change, filter cleaning, wash" },
        { packageId: 3, name: "Repair Service", price: "Based on issue", description: "Mechanical and electrical repairs" }
      ]);

      await Booking.insertMany([
        { bookingId: 5001, userId: 1, vehicleId: 101, packageId: 1, serviceType: "General Service", serviceDate: "2025-01-15", timeSlot: "10:00 AM", pickupRequired: true, status: "Booked", paymentId: 9001 }
      ]);

      await Payment.insertMany([
        { paymentId: 9001, bookingId: 5001, amount: 899, paymentMode: "UPI", paymentStatus: "Success", transactionId: "TXN8921374" }
      ]);

      console.log('📊 Sample data initialized');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Initialize data on startup
setTimeout(initializeData, 2000);

// Authentication Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      res.json({ 
        success: true, 
        user: { 
          id: user.userId, 
          name: user.name, 
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role
        } 
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const lastUser = await User.findOne().sort({ userId: -1 });
    const newUserId = lastUser ? lastUser.userId + 1 : 1;
    
    const newUser = new User({
      userId: newUserId,
      name,
      email,
      phone,
      address: '',
      role: 'customer'
    });
    
    await newUser.save();
    res.json({ 
      success: true, 
      message: 'User registered successfully', 
      user: { id: newUser.userId, name, email, phone } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, '-__v');
    res.json(users.map(u => ({
      id: u.userId,
      name: u.name,
      email: u.email,
      phone: u.phone,
      address: u.address,
      role: u.role
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ userId: parseInt(req.params.id) });
    if (user) {
      res.json({
        id: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Booking Routes
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
      const user = await User.findOne({ userId: booking.userId });
      const vehicle = await Vehicle.findOne({ vehicleId: booking.vehicleId });
      const servicePackage = await ServicePackage.findOne({ packageId: booking.packageId });
      
      return {
        id: booking.bookingId,
        userId: booking.userId,
        userName: user?.name,
        vehicleInfo: vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Unknown',
        serviceType: booking.serviceType,
        serviceName: servicePackage?.name,
        date: booking.serviceDate,
        time: booking.timeSlot,
        status: booking.status,
        pickupRequired: booking.pickupRequired,
        paymentId: booking.paymentId
      };
    }));
    
    res.json(bookingsWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const lastBooking = await Booking.findOne().sort({ bookingId: -1 });
    const newBookingId = lastBooking ? lastBooking.bookingId + 1 : 5001;
    
    const newBooking = new Booking({
      bookingId: newBookingId,
      ...req.body,
      status: 'Booked'
    });
    
    await newBooking.save();
    res.json({ success: true, booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Service Package Routes
app.get('/api/service-packages', async (req, res) => {
  try {
    const packages = await ServicePackage.find({}, '-__v');
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Vehicle Service API connected to MongoDB Atlas',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Database check route
app.get('/api/db-check', async (req, res) => {
  try {
    const users = await User.countDocuments();
    const vehicles = await Vehicle.countDocuments();
    const bookings = await Booking.countDocuments();
    const payments = await Payment.countDocuments();
    const packages = await ServicePackage.countDocuments();
    
    const sampleUsers = await User.find().limit(3).select('name email');
    const sampleVehicles = await Vehicle.find().limit(3).select('brand model numberPlate');
    
    res.json({
      collections: { users, vehicles, bookings, payments, packages },
      sampleData: { users: sampleUsers, vehicles: sampleVehicles }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚗 Vehicle Service Backend running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🗄️  Database: MongoDB Atlas`);
});

module.exports = app;