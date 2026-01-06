import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Bus from '../models/Bus.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bus_tracking');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Bus.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create buses
        const buses = await Bus.insertMany([
            {
                busId: 'BUS001',
                name: 'Route A - Main Campus',
                routeName: 'Route A',
                capacity: 40,
                currentPassengers: 0,
                status: 'inactive',
                currentLocation: { lat: 28.6139, lng: 77.2090 }
            },
            {
                busId: 'BUS002',
                name: 'Route B - North Campus',
                routeName: 'Route B',
                capacity: 40,
                currentPassengers: 0,
                status: 'inactive',
                currentLocation: { lat: 28.6889, lng: 77.2090 }
            },
            {
                busId: 'BUS003',
                name: 'Route C - South Campus',
                routeName: 'Route C',
                capacity: 35,
                currentPassengers: 0,
                status: 'inactive',
                currentLocation: { lat: 28.5389, lng: 77.2090 }
            }
        ]);
        console.log('🚌 Created buses');

        // Create users
        const users = await User.insertMany([
            // Admin users
            {
                username: 'admin',
                password: 'admin123',
                role: 'admin',
                name: 'Admin User',
                email: 'admin@college.edu',
                phone: '1234567890'
            },
            // Driver users
            {
                username: 'driver1',
                password: 'driver123',
                role: 'driver',
                name: 'Mike Driver',
                email: 'mike@college.edu',
                phone: '1234567891',
                licenseNumber: 'DL12345678',
                assignedBusId: buses[0]._id
            },
            {
                username: 'driver2',
                password: 'driver123',
                role: 'driver',
                name: 'Sarah Johnson',
                email: 'sarah@college.edu',
                phone: '1234567892',
                licenseNumber: 'DL87654321',
                assignedBusId: buses[1]._id
            },
            {
                username: 'driver3',
                password: 'driver123',
                role: 'driver',
                name: 'Tom Wilson',
                email: 'tom@college.edu',
                phone: '1234567893',
                licenseNumber: 'DL11223344',
                assignedBusId: buses[2]._id
            },
            // Student users
            {
                username: 'student1',
                password: 'student123',
                role: 'student',
                name: 'John Doe',
                email: 'john@college.edu',
                phone: '1234567894',
                studentId: 'STU001',
                busId: buses[0]._id
            },
            {
                username: 'student2',
                password: 'student123',
                role: 'student',
                name: 'Jane Smith',
                email: 'jane@college.edu',
                phone: '1234567895',
                studentId: 'STU002',
                busId: buses[1]._id
            },
            {
                username: 'student3',
                password: 'student123',
                role: 'student',
                name: 'Alice Brown',
                email: 'alice@college.edu',
                phone: '1234567896',
                studentId: 'STU003',
                busId: buses[2]._id
            }
        ]);
        console.log('👥 Created users');

        // Update buses with driver references
        await Bus.findByIdAndUpdate(buses[0]._id, { driver: users[1]._id });
        await Bus.findByIdAndUpdate(buses[1]._id, { driver: users[2]._id });
        await Bus.findByIdAndUpdate(buses[2]._id, { driver: users[3]._id });

        console.log('\n✅ Database seeded successfully!\n');
        console.log('📝 Sample Login Credentials:');
        console.log('\n👨‍💼 Admin:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('\n🚗 Drivers:');
        console.log('   Username: driver1, driver2, driver3');
        console.log('   Password: driver123');
        console.log('\n🎓 Students:');
        console.log('   Username: student1, student2, student3');
        console.log('   Password: student123\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
