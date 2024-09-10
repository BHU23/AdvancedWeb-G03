const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentSchema = new mongoose.Schema({
    commentID: {
        type: Number,
        unique: true
    },
    userComments: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    reviewID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentCommentID: {
        type: Number, // Reference to the parent comment (for nested comments)
        ref: 'Comment',
        required: false
    }
}, { timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } });

// Apply auto-increment to commentID field
commentSchema.plugin(AutoIncrement, { inc_field: 'commentID' });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
