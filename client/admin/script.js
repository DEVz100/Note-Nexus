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

// Add logout functionality
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login.html";
}
