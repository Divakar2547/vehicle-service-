const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, default: '' },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
}, { timestamps: true });

// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: Number, unique: true, required: true },
  userId: { type: Number, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  numberPlate: { type: String, required: true, unique: true },
  year: { type: Number, required: true }
}, { timestamps: true });

// Service Package Schema
const servicePackageSchema = new mongoose.Schema({
  packageId: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  price: { type: mongoose.Schema.Types.Mixed, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

// Booking Schema
const bookingSchema = new mongoose.Schema({
  bookingId: { type: Number, unique: true, required: true },
  userId: { type: Number, required: true },
  vehicleId: { type: Number, required: true },
  packageId: { type: Number, required: true },
  serviceType: { type: String, required: true },
  serviceDate: { type: String, required: true },
  timeSlot: { type: String, required: true },
  pickupRequired: { type: Boolean, default: false },
  status: { type: String, enum: ['Booked', 'Pending', 'Completed', 'Cancelled'], default: 'Booked' },
  paymentId: { type: Number, default: null }
}, { timestamps: true });

// Payment Schema
const paymentSchema = new mongoose.Schema({
  paymentId: { type: Number, unique: true, required: true },
  bookingId: { type: Number, required: true },
  amount: { type: Number, required: true },
  paymentMode: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Pending' },
  transactionId: { type: String, required: true }
}, { timestamps: true });

// Admin Log Schema
const adminLogSchema = new mongoose.Schema({
  logId: { type: Number, unique: true, required: true },
  adminId: { type: Number, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

// Export models
module.exports = {
  User: mongoose.model('User', userSchema),
  Vehicle: mongoose.model('Vehicle', vehicleSchema),
  ServicePackage: mongoose.model('ServicePackage', servicePackageSchema),
  Booking: mongoose.model('Booking', bookingSchema),
  Payment: mongoose.model('Payment', paymentSchema),
  AdminLog: mongoose.model('AdminLog', adminLogSchema)
};