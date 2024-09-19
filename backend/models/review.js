const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const reviewSchema = new mongoose.Schema({
    reviewID: {
        type: Number,
        unique: true
    },
    topic: {
        type: String,
        required: true
    },
    image: {
        type: Map, // Assuming the image is stored in JSON format
        of: String,
        required: false
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Ensures rating is between 1 and 5
    },
    comment: {
        type: String,
        required: false
    },
    trip_date: {
        type: Date,
        required: true
    },
    reviewDate: {
        type: Date,
        default: Date.now // Timestamp when the review was created
    },
    timeRecommend: {
        type: String // You can use string for time or custom time format
    },
    cost: {
        type: Number,
        required: false
    },
    likeCount: {
        type: Number,
        default: 0
    },
    view: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    placeID: {
        type: mongoose.Schema.Types.ObjectId, // Foreign key referencing Place
        ref: 'Place',
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId, // Foreign key referencing User
        ref: 'Customer',
        required: true
    }
}, { timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } });

// Apply auto-increment to reviewID field
reviewSchema.plugin(AutoIncrement, { inc_field: 'reviewID' });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
