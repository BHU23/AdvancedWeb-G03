const Comment = require('../models/comment');

// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('userID reviewID parentCommentID');
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get a single comment by ID
exports.getCommentByID = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('userID reviewID parentCommentID');
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (err) {
    console.error('Error fetching comment by ID:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { userComments, like, reviewID, userID, parentCommentID } = req.body;

    const newComment = new Comment({
      userComments,
      like,
      reviewID,
      userID,
      parentCommentID
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update a comment by ID
exports.updateComment = async (req, res) => {
  try {
    const { userComments, like, reviewID, userID, parentCommentID } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        userComments,
        like,
        reviewID,
        userID,
        parentCommentID
      },
      { new: true } // Return the updated document
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    console.error('Error updating comment:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ message: err.message });
  }
};
