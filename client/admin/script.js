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
        `http://localhost:5002/api/admin/subjects/${id}`,
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
      "Communication Skills in English",
      "Mathematics - I",
      "Applied Physics",
      "Applied Chemistry",
      "Engineering Graphics",
      "Applied Physics Lab",
      "Applied Chemistry Lab",
      "Introduction to IT Systems Lab",
      "Engineering Workshop Lab",
      "Sports and Yoga",
    ],
    2: [
      "Mathematics - II",
      "Applied Phyics - II",
      "Environment Science",
      "Fundamentals of Electrical & Electronics Engineering",
      "Problem Solving and Programming",
      "Communication Skills in English Lab",
      "Applied Physics Lab",
      "Fundamentals of Electrical & Electronics Engineering Lab",
      "Problem Solving and Programming Lab",
      "Engineering Workshop Practice",
    ],
    3: [
      "Computer System Architecture",
      "Programming in C",
      "Computer Networks -I",
      "Digital Computer Fundamentals",	
      "Programming in C Lab",
      "System Administration Lab",
      "Digital Computer Fundamentals Lab",
      "Computer Hardware Lab -I",
      "Application Development Lab",
    ],
    4: [
      "Object Oriented Programming",
      "Computer Networks II",
      "Embedded System and Real time Operating System",
      "Community Skills in Indian knowledge system",
      "Object Oriented Programming Lab",
      "Network Administration Lab I",
      "Embedded system Lab",
	    "Computer Hardware Lab II",
      "Minor Project",
    ],
    5: [
      "Project Management and Software Engineering",
      "Internet of Things",
      "Operating System",
      "Virtualisation Technology and Cloud Computing/ Web programming/ Data structures",
      "Internet of Things Lab",
      "Network Administration Lab II",
      "Virtualisation Technology and cloud computing Lab/ Web programming Lab/ Data structures Lab",
      "Seminar",
      "Major Project",
    ],
    6: [
      "Entrepreneurship and Startup",
      "Software Testing/ Introduction to 5G/ Fundamentals of Artificial Intelligence & Machine Learning/ Database Management Systems",
      "Introduction to IoT/	Multimedia/ Cloud Computing/ Computer System Hardware",
      "Indian Constitution",
      "Programming Smart Device Lab",
      "Ethical Hacking Lab",
      "Software Testing Lab/ Fundamentals of Artificial Intelligence & Machine Learning Lab/ Database Management Systems Lab",
      "Major Project",
    ],
  },
  CE: {
    1: [
      "Communication Skills in English",
      "Mathematics - I",
      "Applied Physics",
      "Applied Chemistry",
      "Engineering Graphics",
      "Applied Physics Lab",
      "Applied Chemistry Lab",
      "Introduction to IT Systems Lab",
      "Engineering Workshop Lab",
      "Sports and Yoga",
    ],
    2: [
      "Mathematics - II",
      "Applied Phyics - II",
      "Environment Science",
      "Fundamentals of Electrical & Electronics Engineering",
      "Problem Solving and Programming",
      "Communication Skills in English Lab",
      "Applied Physics Lab",
      "Fundamentals of Electrical & Electronics Engineering Lab",
      "Problem Solving and Programming Lab",
      "Engineering Workshop Practice",
    ],
    3: [
      "Computer Organisation",
      "Programming in C",
	    "Database Management Systems",
	    "Digital Computer Fundamentals",
	    "Programming in C Lab",
	    "Database Management System lab",
	    "Digital Computer Fundamentals Lab",
	    "Web Technology lab",
      "Computer System Hardware Lab",
    ],
    4: [
      "Object Oriented Programming",
      "Computer Communication and Networks",
	    "Data Structures",
      "Community Skills in Indian knowledge system",
	    "Object Oriented Programming Lab",
 	    "Web Programming Lab",
 	    "Data Structures Lab",
 	    "Application Development Lab",
 	    "Minor Project",
    ],
    5: [
      "Project Management and Software Engineering",
      "Embedded System and Real time Operating System",
	    "Operating System",
 	    "Virtualisation Technology and Cloud Computing/ Ethical Hacking/ Fundamentals of Artificial Intelligence and Machine Learning",
 	    "Embedded Systems and Real Time Operating System Lab",
 	    "System Administration Lab",
 	    "Virtualisation Technology and cloud computing Lab/ Ethical Hacking Lab/ Fundamentals of Artificial Intelligence and Machine Learning Lab",
 	    "Seminar",
 	    "Major Project",
    ],
    6: [
      "Entrepreneurship and Startup",
	    "Internet of Things",
	    "Server Administration/ Software Testing/ Introduction to 5G",
	    "Introduction to IoT/ Fundamentals of Web Technology/ Multimedia/ Cloud Computing",
	    "Indian Constitution",
	    "Computer Network Engineering Lab",
	    "Smart Device Programming Lab",
	    "Internet of Things Lab/ Server Administration Lab/ Software Testing Lab"	,
	    "Major Project",
    ],
  },
    EL: {
      1: [
        "Communication Skills in English",
        "Mathematics - I",
        "Applied Physics",
        "Applied Chemistry",
        "Engineering Graphics",
        "Applied Physics Lab",
        "Applied Chemistry Lab",
        "Introduction to IT Systems Lab",
        "Engineering Workshop Lab",
        "Sports and Yoga",
      ],
      2: [
        "Mathematics - II",
        "Applied Phyics - II",
        "Environment Science",
        "Fundamentals of Electrical & Electronics Engineering",
        "Elementary Concepts of Electrical Systems",
        "Communication Skills in English Lab",
        "Applied Physics Lab",
        "Fundamentals of Electrical & Electronics Engineering Lab",
        "Engineering Graphics using CAD software",
        "Engineering Workshop Practice",
      ],
      3: [
        "Analog & Digital Circuits",
        "DC Machines & Traction Motors",
	      "Fundamentals of Electric Circuits",
	      "Electrical & Electronics Measuring Instruments",
	      "Mechanical Engineering",
	      "DC Machines Lab",
	      "Electrical Measurements Lab",
	      "Electrical Workshop Practice",
        "Mechanical Engineering Lab",
      ],
      4: [
        "Power Electronics Devices and Circuits",
        "Electrical Installation Design & Estimation",
	      "Induction Machines",
	      "Community Skills in Indian knowledge system",
	      "Electronics Lab",
	      "Induction Machines Lab",
	      "Domestic Appliances Repair & Maintenance Workshop",
	      "Professional Practice Lab",
        "Minor Project",
      ],
      5: [
        "Industrial Management and Safety",
        "Synchronous Machines & FHP Motors",
	      "Electricity Generation, Transmission & Distribution",
	      "Renewable Energy Power Plant/ Industrial Drives & Control/ Switch Gear & Protection",
	      "Synchronous Machines Lab",
	      "Industrial Electrical Engineering Lab",
	      "Electrical Estimation Lab/ Applied Electronics Lab/ Solar Energy Technology Lab",
	      "Seminar",
        "Major Project",
      ],
      6: [
        "Entrepreneurship and Startup",
        "Energy Conservation & Audit (EE)/	Microcontroller & PLC/	Electric Vehicles",
	      "Solar Power Technologies/Energy Conservation & Management/	Electrification of Residential Buildings/ Electric Vehicles & Traction",
	      "Indian Constitution",
	      "Electrical Computer Aided Drafting Lab",
	      "Industrial Automation Lab",
	      "Applied Electrical Testing Lab/ Modelling and simulation Lab/ Advanced Solar Photovoltaic Lab",
	      "Major Project",
      ],
  },
  BME: {
    1: [
      "Communication Skills in English",
      "Mathematics - I",
      "Applied Physics",
      "Applied Chemistry",
      "Engineering Graphics",
      "Applied Physics Lab",
      "Applied Chemistry Lab",
      "Introduction to IT Systems Lab",
      "Engineering Workshop Lab",
      "Sports and Yoga",
    ],
    2: [
      "Mathematics - II",
      "Applied Phyics - II",
      "Environment Science",
      "Fundamentals of Electrical & Electronics Engineering",
      "Basic Electronics",
      "Communication Skills in English Lab",
      "Applied Physics Lab",
      "Fundamentals of Electrical & Electronics Engineering Lab",
      "Electronics Tinkering Workshop",
      "Engineering Workshop Practice",
    ],
    3: [
      "Basic Medical Sciences",
      "Medical Instrumentation",
	    "Electronic Circuits",
	    "Digital Electronics",
	    "Electronic Measurements and Instrumentation",
	    "PCB and Prototyping Workshop",
	    "Electronic Circuits Lab",
	    "Digital Electronics Lab",
      "Servicing Fundamentals Lab",
    ],
    4: [
      "Linear Integrated Circuits",
      "Microcontroller and Applications",
	    "Therapeutic Equipment",
	    "Community Skills in Indian knowledge system",
	    "Electric Circuits & Networks",
	    "Linear Integrated Circuits Lab",
	    "Microcontroller and Applications Lab",
	    "Medical Electronics Lab 1",
      "Minor Project",
    ],
    5: [
      "Industrial Management and Safety",
      "Medical Imaging Techniques",
	    "Hospital Systems",
	    "Embedded Systems/	Analytical Instruments/ Programming in C",
	    "Medical Electronics Lab II",
	    "Biomedical Instrumentation Lab I",
	    "Embedded Systems Lab/ Programming in C Lab",
	    "Seminar",
      "Major Project",
    ],
    6: [
      "Entrepreneurship and Startup",
      "Introduction to 5G/ Advanced Medical Instrumentation and Prosthetics/ Signals and Systems/ Bio MEMS",
	    "Healthcare Informatics/ Rehabilitation Engineering/ Biomedical Instrumentation/ IoT in Healthcare",
	    "Indian Constitution",
	    "Biomedical Instrumentation Lab II	",
	    "Computer Hardware and Data Communication Lab",
	    "Simulation Lab with Numerical software/ Biomedical Equipment Servicing and Maintenance Lab",
	    "Major Project",
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
          ? "http://localhost:5002"
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