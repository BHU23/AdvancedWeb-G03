const Review = require("../models/review");

// Get all Reviews
exports.getAllReviews = async (req, res) => {
	try {
		const reviews = await Review.find().populate("placeID userID");
		res.status(200).json(reviews);
	} catch (err) {
		console.error("Error fetching Reviews:", err);
		res.status(500).json({ message: err.message });
	}
};

// Get Review by ID
exports.getReviewByID = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id).populate("placeID userID");
		if (!review) {
			return res.status(404).json({ message: "Review not found" });
		}
		res.status(200).json(review);
	} catch (err) {
		console.error("Error fetching Review by ID:", err);
		res.status(500).json({ message: err.message });
	}
};

// Create a new Review
exports.createReview = async (req, res) => {
	try {
		const newReview = new Review(req.body);

		// Save the new Review to the database
		const savedReview = await newReview.save();
		res.status(201).json(savedReview);
	} catch (err) {
		console.error("Error creating Review:", err);
		res.status(500).json({ message: err.message });
	}
};

// Update Review by ID
exports.updateReview = async (req, res) => {
	try {
		const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Return the updated document
			runValidators: true, // Ensure validation is applied
		});

		if (!updatedReview) {
			return res.status(404).json({ message: "Review not found" });
		}

		res.status(200).json(updatedReview);
	} catch (err) {
		console.error("Error updating Review:", err);
		res.status(500).json({ message: err.message });
	}
};

exports.incrementViewCount = async (req, res) => {
	try {
		const reviewId = req.params.id; // Get the review ID from the request parameters

		// Increment the view count
		const updatedReview = await Review.findByIdAndUpdate(
			reviewId,
			{ $inc: { view: 1 } }, // Increment the views field by 1
			{ new: true } // Return the updated document
		);

		if (!updatedReview) {
			return res.status(404).json({ message: "Review not found" });
		}

		res.status(200).json(updatedReview);
	} catch (err) {
		console.error("Error incrementing view count:", err);
		res.status(500).json({ message: err.message });
	}
};

exports.incrementLikeCount = async (req, res) => {
	try {
		const reviewId = req.params.id; // Get the review ID from the request parameters

		// Increment the like count
		const updatedReview = await Review.findByIdAndUpdate(
			reviewId,
			{ $inc: { likeCount: 1 } }, // Increment the likeCount field by 1
			{ new: true } // Return the updated document
		);

		if (!updatedReview) {
			return res.status(404).json({ message: "Review not found" });
		}

		res.status(200).json(updatedReview);
	} catch (err) {
		console.error("Error incrementing like count:", err);
		res.status(500).json({ message: err.message });
	}
};

// Delete Review by ID
exports.deleteReview = async (req, res) => {
	try {
		const deletedReview = await Review.findByIdAndDelete(req.params.id);

		if (!deletedReview) {
			return res.status(404).json({ message: "Review not found" });
		}

		res.status(200).json({ message: "Review deleted successfully" });
	} catch (err) {
		console.error("Error deleting Review:", err);
		res.status(500).json({ message: err.message });
	}
};
