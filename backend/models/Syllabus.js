import mongoose from "mongoose";

// Define the Unit schema
const unitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  chapters: {
    type: String,
    required: true,
  },
});

// Define the Syllabus schema
const syllabusSchema = new mongoose.Schema({
  units: {
    type: Map, // Use a Map to dynamically store units
    of: unitSchema,
  },
});

// Define the Subject schema
const subjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  paper_id: {
    type: String,
    required: true,
    unique: true, // Ensure each subject has a unique paper_id
  },
  syllabus: {
    type: syllabusSchema,
    required: true,
  },
});

// Create the models
const Unit = mongoose.model("Unit", unitSchema);
const Syllabus = mongoose.model("Syllabus", syllabusSchema);
const Subject = mongoose.model("Subject", subjectSchema);

module.exports = { Unit, Syllabus, Subject };
