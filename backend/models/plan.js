const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const planningSchema = new mongoose.Schema({
    tripID: {
        type: Number,
        unique: true
    },
    tripName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    budget: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
}, { timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } });

planningSchema.plugin(AutoIncrement, { inc_field: 'tripID' });

const Planning = mongoose.model('Planning', planningSchema);

module.exports = Planning;
