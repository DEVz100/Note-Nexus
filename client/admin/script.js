let subjects = [];
let editingSubject = null;
let notes = [];
let videos = [];
let syllabus = [];

// Form elements
const subjectForm = document.getElementById("subjectForm");
const formTitle = document.getElementById("formTitle");

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  fetchSubjects();
  setupFormSubmission();
});

// Fetch subjects from the API
async function fetchSubjects() {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debug log

    const response = await fetch("/api/admin/subjects", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch subjects");
    }

    subjects = await response.json();
    renderSubjects();
  } catch (error) {
    console.error("Error fetching subjects:", error);
    alert(error.message || "Error fetching subjects. Please try again.");
  }
}

// Setup form submission handler
function setupFormSubmission() {
  subjectForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate required fields
    const branch = document.getElementById("branch").value;
    const semester = document.getElementById("semester").value;
    const subjectName = document.getElementById("subjectCode").value;

    if (!branch || !semester || !subjectName) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = {
      branch,
      semester,
      code: document.getElementById("subjectCode").value,
      subjectName: document.getElementById("subjectName").value,
      akashUrl: document.getElementById("akashUrl").value || "",
      bookUrl: document.getElementById("bookUrl").value || "",
      paperAnalysisUrl: document.getElementById("paperAnalysisUrl").value || "",
      notes: notes,
      youtube: videos,
      syllabus: syllabus,
    };

    try {
      const token = localStorage.getItem("token");
      const url = editingSubject
        ? `/api/admin/subjects/${editingSubject._id}`
        : "/api/admin/subjects";

      const method = editingSubject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit subject");
      }

      resetForm();
      fetchSubjects();
      alert(
        editingSubject
          ? "Subject updated successfully"
          : "Subject added successfully"
      );
    } catch (error) {
      console.error("Error submitting subject:", error);
      alert(error.message);
    }
  });
}

// Reset form
function resetForm() {
  editingSubject = null;
  document.getElementById("semester").value = "1";
  updateSubjectCodes(); // Update subject codes when resetting
  document.getElementById("akashUrl").value = "";
  document.getElementById("bookUrl").value = "";
  document.getElementById("paperAnalysisUrl").value = "";
  notes = [];
  videos = [];
  syllabus = [];
  formTitle.textContent = "Add New Subject";
  renderNotes();
  renderVideos();
  renderSyllabus();
  document.querySelector(".submit-btn").textContent = "Add Subject";
}

// Add a new note
function addNote() {
  const name = document.getElementById("noteName").value.trim();
  const url = document.getElementById("noteUrl").value.trim();

  if (name && url) {
    notes.push({ name, url });
    document.getElementById("noteName").value = "";
    document.getElementById("noteUrl").value = "";
    renderNotes();
  } else {
    alert("Please enter both name and URL for the note");
  }
}

function addSyllabus() {
  const unit = document.getElementById("sylUnit").value.trim();
  const title = document.getElementById("sylTitle").value.trim();
  const content = document.getElementById("sylContent").value.trim();

  if (unit && title && content) {
    syllabus.push({ unit, title, content });
    document.getElementById("sylUnit").value = "";
    document.getElementById("sylTitle").value = "";
    document.getElementById("sylContent").value = "";
    renderSyllabus();
  } else {
    alert("Please fill all the field");
  }
}

// Add a new video
function addVideo() {
  const name = document.getElementById("videoName").value.trim();
  const url = document.getElementById("videoUrl").value.trim();

  if (name && url) {
    videos.push({ name, url });
    document.getElementById("videoName").value = "";
    document.getElementById("videoUrl").value = "";
    renderVideos();
  } else {
    alert("Please enter both name and URL for the video");
  }
}

// Remove a note
function removeNote(index) {
  notes.splice(index, 1);
  renderNotes();
}

// Remove a syllabus
function removeSyllabus(index) {
  syllabus.splice(index, 1);
  renderSyllabus();
}

// Remove a video
function removeVideo(index) {
  videos.splice(index, 1);
  renderVideos();
}

// Render notes list
function renderNotes() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = notes
    .map(
      (note, index) => `
        <div class="item">
            <span>${note.name}</span>
            <button class="remove-btn" onclick="removeNote(${index})">Remove</button>
        </div>
    `
    )
    .join("");
}

// Render notes list
function renderSyllabus() {
  const syllabusList = document.getElementById("sylList");
  syllabusList.innerHTML = syllabus
    .map(
      (item, index) => `
        <div class="item">
            <span>Unit ${item.unit}: ${item.title}</span>
            <p>${item.content}</p>
            <button class="remove-btn" onclick="removeSyllabus(${index})">Remove</button>
        </div>
    `
    )
    .join("");
}

// Render videos list
function renderVideos() {
  const videosList = document.getElementById("videosList");
  videosList.innerHTML = videos
    .map(
      (video, index) => `
        <div class="item">
            <span>${video.name}</span>
            <button class="remove-btn" onclick="removeVideo(${index})">Remove</button>
        </div>
    `
    )
    .join("");
}

// Render subjects list
function renderSubjects() {
  const subjectsList = document.getElementById("subjectsList");
  subjectsList.innerHTML = subjects
    .map(
      (subject) => `
        <div class="subject-item">
          <div class="subject-info">
            <h3>${subject.subjectName}</h3>
            <p>Branch: ${subject.branch}</p>
            <p>Semester: ${subject.semester}</p>
          </div>
          <div class="subject-actions">
            <button onclick="editSubject(${JSON.stringify(subject).replace(
              /"/g,
              "'"
            )})">Edit</button>
            <button onclick="deleteSubject('${
              subject._id
            }')" class="delete-btn">Delete</button>
          </div>
        </div>
      `
    )
    .join("");
}

// Edit a subject
async function editSubject(subject) {
  try {
    editingSubject = subject;
    formTitle.textContent = "Edit Subject";

    // Set branch and semester first
    document.getElementById("branch").value = subject.branch;
    document.getElementById("semester").value = subject.semester;

    // Update subject codes based on branch and semester
    updateSubjectCodes();

    // Wait a brief moment for the subject codes to be populated
    setTimeout(() => {
      // Now set the subject code
      document.getElementById("subjectCode").value = subject.subjectName;

      // Set the rest of the form fields
      document.getElementById("akashUrl").value = subject.akashUrl || "";
      document.getElementById("bookUrl").value = subject.bookUrl || "";
      document.getElementById("paperAnalysisUrl").value =
        subject.paperAnalysisUrl || "";

      // Update notes and videos arrays
      notes = Array.isArray(subject.notes) ? [...subject.notes] : [];
      videos = Array.isArray(subject.youtube) ? [...subject.youtube] : [];
      syllabus = Array.isArray(subject.syllabus) ? [...subject.syllabus] : [];

      // Render notes and videos
      renderNotes();
      renderVideos();
      renderSyllabus();

      document.querySelector(".submit-btn").textContent = "Update Subject";
    }, 100);
  } catch (error) {
    console.error("Error editing subject:", error);
    alert("Error loading subject data. Please try again.");
  }
}

// Delete a subject
async function deleteSubject(id) {
  if (confirm("Are you sure you want to delete this subject?")) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/admin/subjects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete subject");
      }

      fetchSubjects();
      alert("Subject deleted successfully");
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Error deleting subject. Please try again.");
    }
  }
}




function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

// Check if user is logged in and is admin
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    window.location.href = "/login";
    return;
  }

  // Redirect non-admin users to home page
  if (user.role !== "admin") {
    window.location.href = "/";
  }
});

// update the supbject names here

const subjectOptions = {
  CHE: {
    1: [
      "Mathematics – I",
      "Technical Communication",
      "Programming with C",
      "Introduction to Computers & IT",
      "Physics",
    ],
    2: [
      "Mathematics – II",
      "Principles of Management",
      "Digital Electronics",
      "Data Structure using C",
      "Database Management System",
    ],
    3: [
      "Mathematics – III",
      "Computer Architecture",
      "Front End Design Tool VB.Net",
      "Principles of Accounting",
      "Object Oriented Programming using C++",
    ],
    4: [
      "Mathematics – IV",
      "Web Technologies",
      "Java Programming",
      "Software Engineering",
      "Computer Networks",
    ],
    5: [
      "Operating System",
      "Computer Graphics",
      "E- Commerce",
      "Software Testing",
      "Microprocessor",
      "Advance Computer Networks",
      "Web Based Programming",
      "Business Economics",
    ],
    6: [
      "Data Ware Housing & Data Mining",
      "Mobile Computing",
      "Linux Environment",
      "Multimedia & Its Applications",
      "Bio Informatics",
      "Artifical Intelligence",
      "Network Security",
      "Network Programming",
    ],
  },
  CE: {
    1: [
      "Maths 1",
      "Technical Communication",
      "Programming with C",
      "Introduction to Computers & IT",
      "Physics",
    ],
    2: [
      "Maths 2",
      "Principles of Management",
      "Digital Electronics",
      "Data Structure using C",
      "Database Management System",
    ],
    3: [
      "Mathematics – III",
      "Computer Architecture",
      "Front End Design Tool VB.Net",
      "Principles of Accounting",
      "Object Oriented Programming using C++",
    ],
    4: [
      "Mathematics – IV",
      "Web Technologies",
      "Java Programming",
      "Software Engineering",
      "Computer Networks",
    ],
    5: [
      "Operating System",
      "Computer Graphics",
      "E- Commerce",
      "Software Testing",
      "Microprocessor",
      "Advance Computer Networks",
      "Web Based Programming",
      "Business Economics",
    ],
    6: [
      "Data Ware Housing & Data Mining",
      "Mobile Computing",
      "Linux Environment",
      "Multimedia & Its Applications",
      "Bio Informatics",
      "Artifical Intelligence",
      "Network Security",
      "Network Programming",
    ],
  },
  // Add other branches as needed
};

function updateSubjectCodes() {
  const branch = document.getElementById("branch").value;
  const semester = document.getElementById("semester").value;
  const subjectNameSelect = document.getElementById("subjectName");
  const subjectCodeInput = document.getElementById("subjectCode");

  subjectNameSelect.innerHTML =
    '<option value="">Select Subject</option>'; // Clear existing options

  if (subjectOptions[branch] && subjectOptions[branch][semester]) {
    subjectOptions[branch][semester].forEach((subject, index) => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      subjectNameSelect.appendChild(option);
    });
  }

  // Update subject code when subject name changes
  subjectNameSelect.addEventListener("change", function () {
    const selectedSubject = this.value;
    if (selectedSubject) {
      const subjectIndex =
        subjectOptions[branch][semester].indexOf(selectedSubject);
      const codeNumber = parseInt(semester) * 100 + (subjectIndex + 1);
      subjectCodeInput.value = `${branch} ${codeNumber}`;
    } else {
      subjectCodeInput.value = "";
    }
  });
}

// Add event listeners
document
  .getElementById("branch")
  .addEventListener("change", updateSubjectCodes);
document
  .getElementById("semester")
  .addEventListener("change", updateSubjectCodes);

// Call once to initialize
document.addEventListener("DOMContentLoaded", updateSubjectCodes);

// Add event listeners for form submission
document
  .getElementById("subjectForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Submitting subject data..."); // Debug log

    const formData = {
      branch: document.getElementById("branch").value,
      semester: document.getElementById("semester").value,
      subjectName: document.getElementById("subjectName").value,
      code: document.getElementById("subjectCode").value,
      akashUrl: document.getElementById("akashUrl").value || "",
      bookUrl: document.getElementById("bookUrl").value || "",
      paperAnalysisUrl:
        document.getElementById("paperAnalysisUrl").value || "",
      notes: notes,
      youtube: videos,
      syllabus: syllabus,
    };

    console.log("Form data:", formData); // Debug log

    try {
      const BASE_URL =
        window.location.hostname === "localhost"
          ? "http://localhost:5000"
          : "";
      const response = await fetch(`${BASE_URL}/api/admin/subjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // First check if response is ok
      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message;
        } catch (e) {
          console.error("Error parsing error response:", e);
          errorMessage = "Server connection error. Please try again.";
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Server response:", result);

      alert("Subject added successfully!");
      location.reload();
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error adding subject:", error);
      alert("Error: " + error.message);
    }
  });