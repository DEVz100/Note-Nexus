import express from "express";
import Subject from "../models/Subject.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Test route
// router.get("/test", (req, res) => {
//   res.json({ message: "Admin API is working" });
// });

// router.use(adminAuth);

// Protect all admin routes with adminAuth middleware
// router.use(adminAuth);  //Hey guys  temporarily comment out for testing

// Get all subjects (GET /api/admin/subjects)
router.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({
      message: "Error fetching subjects",
      error: error.message,
    });
  }
});

// Get subject details
router.get("/subjects/details", async (req, res) => {
  try {
    const { branch, semester, subjectCode } = req.query;
    console.log("Searching for subject:", {
      branch,
      semester,
      code: subjectCode,
    });

    const subject = await Subject.findOne({
      branch,
      semester,
      $or: [{ code: subjectCode }, { subjectName: subjectCode }],
    });

    console.log("Found subject:", subject);

    if (!subject) {
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

// Create a new subject (POST /api/admin/subjects)
router.post("/subjects", async (req, res) => {
  try {
    console.log("Received subject data:", req.body);

    // Validate required fields
    if (
      !req.body.branch ||
      !req.body.semester ||
      !req.body.subjectName ||
      !req.body.code
    ) {
      return res.status(400).json({
        message:
          "Branch, semester, subject code, and subject name are required",
      });
    }

    const subject = new Subject(req.body);
    await subject.save();

    console.log("Saved subject:", subject);
    res.status(201).json(subject);
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(400).json({
      message: "Error creating subject",
      error: error.message,
    });
  }
});

// Update a subject
router.put("/subjects/:id", async (req, res) => {
  try {
    const updates = {
      ...req.body,
      notes: Array.isArray(req.body.notes) ? req.body.notes : [],
      youtube: Array.isArray(req.body.youtube) ? req.body.youtube : [],
      syllabus: Array.isArray(req.body.syllabus) ? req.body.syllabus : [],
    };

    const subject = await Subject.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(subject);
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(400).json({
      message: "Error updating subject",
      error: error.message,
    });
  }
});

// Delete a subject
router.delete("/subjects/:id", async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting subject", error: error.message });
  }
});

export default router;
