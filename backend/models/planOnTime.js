const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const planOntimeSchema = new mongoose.Schema({
    planID: {
        type: Number,
        unique: true
    },
    planName: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    budget: {
        type: Number, // Use Number for float values
        required: true
    },
    feeling: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false,
        min: 1,
        max: 5 // Ensures rating is between 1 and 5
    },
    image: {
        type: Map, // Assuming the image is stored in JSON format
        of: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    // reviewID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Review',
    //     required: false
    // },
    placeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: false
    },
    planningID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Planning',
        required: true
    }
}, { timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } });

// Apply auto-increment to planID field
planOntimeSchema.plugin(AutoIncrement, { inc_field: 'planID' });

const PlanOntime = mongoose.model('PlanOntime', planOntimeSchema);

module.exports = PlanOntime;
