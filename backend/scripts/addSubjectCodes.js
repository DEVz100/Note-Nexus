import mongoose from "mongoose";
import Subject from "../models/Subject.js";

async function addSubjectCodes() {
  try {
    const subjects = await Subject.find({ code: { $exists: false } });

    for (const subject of subjects) {
      // Generate code based on branch and name
      const code = `${subject.branch} ${subject.semester}01`; // You might want to customize this

      await Subject.findByIdAndUpdate(subject._id, { code });
      console.log(`Added code ${code} to subject ${subject.subjectName}`);
    }

    console.log("Finished adding subject codes");
  } catch (error) {
    console.error("Error adding subject codes:", error);
  } finally {
    mongoose.disconnect();
  }
}

addSubjectCodes();
