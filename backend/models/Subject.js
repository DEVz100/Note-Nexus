import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(CHE|CE|BME|EL)\s\d{3}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid subject code!`,
      },
    },
    branch: {
      type: String,
      required: true,
      enum: ["CHE", "BME", "CE", "EL"],
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      enum: ["1", "2", "3", "4", "5", "6"],
      trim: true,
    },
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    akashUrl: {
      type: String,
      default: "",
    },
    bookUrl: {
      type: String,
      default: "",
    },
    paperAnalysisUrl: {
      type: String,
      default: "",
    },
    notes: [
      {
        name: String,
        url: String,
      },
    ],
    youtube: [
      {
        name: String,
        url: String,
      },
    ],
    syllabus: [
      {
        unit: String,
        title: String,
        content: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

subjectSchema.pre("save", function (next) {
  // Ensure consistent formatting of code
  if (this.code) {
    this.code = this.code.trim().toUpperCase();
  }
  next();
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
