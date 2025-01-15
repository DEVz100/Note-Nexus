import mongoose from "mongoose";
import dotenv from "dotenv";
import Subject from "../models/Subject.js";

// Load env vars
dotenv.config();

const initialSubjects = [
  {
    code: "CHE 101",
    branch: "CHE",
    semester: "1",
    subjectName: "Mathematics – I",
    akashUrl: "",
    bookUrl: "",
    paperAnalysisUrl: "",
    notes: [
      {
        name: "Unit 1 Notes",
        url: "https://example.com/math1-unit1",
      },
    ],
    youtube: [],
  },
  {
    code: "CHE 102",
    branch: "CHE",
    semester: "1",
    subjectName: "Technical Communication",
    akashUrl: "",
    bookUrl: "",
    paperAnalysisUrl: "",
    notes: [],
    youtube: [],
  },
  {
    code: "CHE 103",
    branch: "CHE",
    semester: "1",
    subjectName: "Programming with C",
    akashUrl: "",
    bookUrl: "",
    paperAnalysisUrl: "",
    notes: [],
    youtube: [],
  },
  {
    code: "CHE 104",
    branch: "CHE",
    semester: "1",
    subjectName: "Introduction to Computers & IT",
    akashUrl: "",
    bookUrl: "",
    paperAnalysisUrl: "",
    notes: [],
    youtube: [],
  },
  {
    code: "CHE 105",
    branch: "CHE",
    semester: "1",
    subjectName: "Physics",
    akashUrl: "",
    bookUrl: "",
    paperAnalysisUrl: "",
    notes: [],
    youtube: [],
  },
  // Add more subjects as needed
];

async function seedSubjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing subjects
    await Subject.deleteMany({});
    console.log("Cleared existing subjects");

    // Insert new subjects
    await Subject.insertMany(initialSubjects);
    console.log("Inserted initial subjects");

    console.log("Database seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedSubjects();
