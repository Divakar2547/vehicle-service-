const mongoose = require('mongoose');
const { User, Vehicle, ServicePackage, Booking, Payment } = require('./models');
require('dotenv').config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check each collection
    const users = await User.countDocuments();
    const vehicles = await Vehicle.countDocuments();
    const packages = await ServicePackage.countDocuments();
    const bookings = await Booking.countDocuments();
    const payments = await Payment.countDocuments();

    console.log('\n📊 Database Statistics:');
    console.log(`Users: ${users}`);
    console.log(`Vehicles: ${vehicles}`);
    console.log(`Service Packages: ${packages}`);
    console.log(`Bookings: ${bookings}`);
    console.log(`Payments: ${payments}`);

    // Show sample data
    console.log('\n👤 Sample Users:');
    const sampleUsers = await User.find().limit(3);
    sampleUsers.forEach(user => console.log(`- ${user.name} (${user.email})`));

    console.log('\n🚗 Sample Vehicles:');
    const sampleVehicles = await Vehicle.find().limit(3);
    sampleVehicles.forEach(vehicle => console.log(`- ${vehicle.brand} ${vehicle.model} (${vehicle.numberPlate})`));

    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  }
}

checkDatabase();