const Feedback = require("../models/feedback");

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res
        .status(400)
        .json({ message: "Email and feedback are required" });
    }

    const feedback = new Feedback({ email, message });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting feedback" });
  }
};

// Get all feedback (for admin)
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching feedback" });
  }
};
