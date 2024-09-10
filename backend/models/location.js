const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const placeSchema = new mongoose.Schema({
    placeID: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    googleMapsUrl: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false,
        min: 0,
        max: 5,
        set: v => Math.round(v * 10) / 10 // Round to one decimal place
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } });

// Apply auto-increment to placeID field
placeSchema.plugin(AutoIncrement, { inc_field: 'placeID' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
