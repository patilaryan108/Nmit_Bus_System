import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
    busId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    routeName: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    currentPassengers: {
        type: Number,
        default: 0,
        min: 0
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'delayed', 'maintenance'],
        default: 'inactive'
    },
    currentLocation: {
        lat: {
            type: Number,
            required: false
        },
        lng: {
            type: Number,
            required: false
        }
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Bus = mongoose.model('Bus', busSchema);

export default Bus;
