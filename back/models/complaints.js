const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  typeOfComplaint: {
    type: String,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  detailsOfIssue: {
    type: String,
  },
  pictureOfIssue: {
    type: String,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
