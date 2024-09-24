const Comment = require("../models/comment");

exports.getAllComments = async (req, res) => {
	try {
		const comments = await Comment.find().populate("userID reviewID parentCommentID");
		res.status(200).json(comments);
	} catch (err) {
		console.error("Error fetching comments:", err);
		res.status(500).json({ message: err.message });
	}
};

// Get a single comment by ID
exports.getCommentByID = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id).populate("userID reviewID parentCommentID");
		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}
		res.status(200).json(comment);
	} catch (err) {
		console.error("Error fetching comment by ID:", err);
		res.status(500).json({ message: err.message });
	}
};

exports.getCommentsByReviewId = async (req, res) => {
	const reviewId = req.params.id;

	try {
		// Fetch comments associated with the given review ID
		const comments = await Comment.find({ reviewID: reviewId }).populate("userID"); // Adjust based on your schema
		if (!comments) {
			return res.status(404).json({ message: "No comments found for this review" });
		}
		return res.status(200).json(comments);
	} catch (err) {
		console.error("Error fetching comments:", err);
		res.status(500).json({ message: err.message });
	}
};

exports.getCommentsByParentId = async (req, res) => {
	try {
		const { parentCommentID } = req.query; // Get the parentCommentID from the query parameters

		// Find comments where parentCommentID matches
		const comments = await Comment.find({ parentCommentID: parentCommentID })
			.populate("userID") // Populate user details
			.exec();

		res.status(200).json(comments);
	} catch (error) {
		console.error("Error fetching comments by parent ID:", error);
		res.status(500).json({ message: "Error fetching comments" });
	}
};

// Create a new comment
exports.createComment = async (req, res) => {
	try {
		const { userComments, reviewID, userID, parentCommentID } = req.body;

		const newComment = new Comment({
			userComments,
			reviewID,
			userID,
			parentCommentID: parentCommentID || null, // Store the parent comment ID if it exists
		});

		const savedComment = await newComment.save();

		// If this is a child comment, update the parent comment to include the child comment ID
		if (parentCommentID) {
			await Comment.findByIdAndUpdate(parentCommentID, {
				$push: { childCommentID: savedComment._id }, // Assuming you have a childComments field in the parent comment schema
			});
		}

		res.status(201).json(savedComment);
	} catch (error) {
		console.error("Error adding comment:", error);
		res.status(500).json({ message: "Error adding comment" });
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
				parentCommentID,
			},
			{ new: true } // Return the updated document
		);

		if (!updatedComment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		res.status(200).json(updatedComment);
	} catch (err) {
		console.error("Error updating comment:", err);
		res.status(500).json({ message: err.message });
	}
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
	try {
		const deletedComment = await Comment.findByIdAndDelete(req.params.id);

		if (!deletedComment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		res.status(200).json({ message: "Comment deleted successfully" });
	} catch (err) {
		console.error("Error deleting comment:", err);
		res.status(500).json({ message: err.message });
	}
};
