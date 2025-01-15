import express from "express";
import Subject from "../models/Subject.js";

const router = express.Router();

// Get subject details (public route)
router.get("/subjects/details", async (req, res) => {
  try {
    const { branch, semester, subjectCode } = req.query;
    console.log("Searching for subject:", {
      branch,
      semester,
      code: subjectCode,
    });

    // Find all subjects matching the criteria for debugging
    const allSubjects = await Subject.find({ branch, semester });
    console.log("All matching subjects:", allSubjects);

    // First try to find by code
    let subject = await Subject.findOne({
      branch,
      semester,
      code: subjectCode,
    });

    // If not found, try case-insensitive search
    if (!subject) {
      subject = await Subject.findOne({
        branch,
        semester,
        code: { $regex: new RegExp(subjectCode, "i") },
      });
    }

    console.log("Found subject:", subject);

    if (!subject) {
      console.log("No subject found with criteria:", {
        branch,
        semester,
        code: subjectCode,
      });
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(subject);
  } catch (error) {
    console.error("Error fetching subject details:", error);
    res.status(500).json({
      message: "Error fetching subject details",
      error: error.message,
    });
  }
});

// Get all subjects for a branch and semester (public route)
router.get("/subjects", async (req, res) => {
  try {
    const { branch, semester } = req.query;
    const query = {};

    if (branch) query.branch = branch;
    if (semester) query.semester = semester;

    const subjects = await Subject.find(query)
      .select("code subjectName branch semester")
      .sort({ code: 1 });

    console.log("Sending subjects:", subjects);
    res.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({
      message: "Error fetching subjects",
      error: error.message,
    });
  }
});

// Get subjects by semester (public route)
router.get("/subjects/semester/:semester", async (req, res) => {
  try {
    const { semester } = req.params;
    const { branch } = req.query;

    const query = { semester };
    if (branch) query.branch = branch;

    const subjects = await Subject.find(query)
      .select("code subjectName branch semester")
      .sort({ code: 1 });

    console.log(`Sending semester ${semester} subjects:`, subjects);
    res.json(subjects);
  } catch (error) {
    console.error("Error fetching semester subjects:", error);
    res.status(500).json({
      message: "Error fetching semester subjects",
      error: error.message,
    });
  }
});

// Get all branches (public route)
router.get("/branches", async (req, res) => {
  try {
    const branches = await Subject.distinct("branch");
    res.json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({
      message: "Error fetching branches",
      error: error.message,
    });
  }
});

// Search subjects (public route)
router.get("/subjects/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const subjects = await Subject.find({
      $or: [
        { subjectName: { $regex: query, $options: "i" } },
        { code: { $regex: query, $options: "i" } },
      ],
    })
      .select("code subjectName branch semester")
      .sort({ code: 1 });

    res.json(subjects);
  } catch (error) {
    console.error("Error searching subjects:", error);
    res.status(500).json({
      message: "Error searching subjects",
      error: error.message,
    });
  }
});

export default router;
