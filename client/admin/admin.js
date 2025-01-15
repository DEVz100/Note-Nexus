// let subjects = [];
// let editingSubject = null;
// let notes = [];
// let videos = [];
// let syllabus = [];

// // Form elements
// const subjectForm = document.getElementById("subjectForm");
// const formTitle = document.getElementById("formTitle");

// // Initialize the application
// document.addEventListener("DOMContentLoaded", () => {
//   fetchSubjects();
//   setupFormSubmission();
// });

// // Fetch subjects from the API
// async function fetchSubjects() {
//   try {
//     const response = await fetch("/api/admin/subjects", {
//       headers: {
//         Authorization: `Bearer ${getAuthToken()}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch subjects");
//     }
//     subjects = await response.json();
//     renderSubjects();
//   } catch (error) {
//     console.error("Error fetching subjects:", error);
//     handleAuthError(error);
//   }
// }

// // Get auth token from localStorage
// function getAuthToken() {
//   return localStorage.getItem("authToken");
// }

// // Handle authentication errors
// function handleAuthError(error) {
//   if (error.status === 401 || error.status === 403) {
//     alert("Please login as admin to continue");
//     window.location.href = "/login";
//   }
// }

// // Setup form submission handler
// function setupFormSubmission() {
//   subjectForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const formData = {
//       code: document.getElementById("code").value,
//       subjectName: document.getElementById("subjectName").value,
//       branch: document.getElementById("branch").value,
//       akashUrl: document.getElementById("akashUrl").value,
//       bookUrl: document.getElementById("bookUrl").value,
//       paperAnalysisUrl: document.getElementById("paperAnalysisUrl").value,
//       notes: notes,
//       youtube: videos,
//       syllabus: syllabus,
//     };

//     try {
//       const url = editingSubject
//         ? `/api/admin/subjects/${editingSubject._id}`
//         : "/api/admin/subjects";

//       const method = editingSubject ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getAuthToken()}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit subject");
//       }

//       if (response.ok) {
//         resetForm();
//         fetchSubjects();
//       }
//     } catch (error) {
//       console.error("Error submitting subject:", error);
//       handleAuthError(error);
//     }
//   });
// }

// // Reset form to initial state
// function resetForm() {
//   subjectForm.reset();
//   editingSubject = null;
//   notes = [];
//   videos = [];
//   syllabus = [];
//   formTitle.textContent = "Add New Subject";
//   renderNotes();
//   renderVideos();
//   renderSyllabus();
//   document.querySelector(".submit-btn").textContent = "Add Subject";
// }

// // Add a new note
// function addNote() {
//   const name = document.getElementById("noteName").value;
//   const url = document.getElementById("noteUrl").value;

//   if (name && url) {
//     notes.push({ name, url });
//     document.getElementById("noteName").value = "";
//     document.getElementById("noteUrl").value = "";
//     renderNotes();
//   }
// }

// // Add a new syllabus
// function addSyllabus() {
//   const unit = document.getElementById("sylUnit").value;
//   const title = document.getElementById("sylTitle").value;
//   const content = document.getElementById("sylContent").value;

//   if (unit && title && content) {
//     syllabus.push({ unit, title, content });
//     document.getElementById("sylUnit").value = "";
//     document.getElementById("sylTitle").value = "";
//     document.getElementById("sylContent").value = "";
//     renderSyllabus();
//   }
// }

// // Add a new video
// function addVideo() {
//   const name = document.getElementById("videoName").value;
//   const url = document.getElementById("videoUrl").value;

//   if (name && url) {
//     videos.push({ name, url });
//     document.getElementById("videoName").value = "";
//     document.getElementById("videoUrl").value = "";
//     renderVideos();
//   }
// }

// // Render notes list
// function renderNotes() {
//   const notesList = document.getElementById("notesList");
//   notesList.innerHTML = notes
//     .map(
//       (note, index) => `
//         <div class="item">
//             <span>${note.name}</span>
//             <button class="remove-btn" onclick="removeNote(${index})">Remove</button>
//         </div>
//     `
//     )
//     .join("");
// }

// // Render syllabus
// function renderSyllabus() {
//   const notesList = document.getElementById("sylList");
//   notesList.innerHTML = notes
//     .map(
//       (syllabus, index) => `
//         <div class="item">
//             <span>${syllabus.unit}</span>
//             <span>${syllabus.title}</span>
//             <button class="remove-btn" onclick="removeUnit(${index})">Remove</button>
//         </div>
//     `
//     )
//     .join("");
// }

// // Render videos list
// function renderVideos() {
//   const videosList = document.getElementById("videosList");
//   videosList.innerHTML = videos
//     .map(
//       (video, index) => `
//         <div class="item">
//             <span>${video.name}</span>
//             <button class="remove-btn" onclick="removeVideo(${index})">Remove</button>
//         </div>
//     `
//     )
//     .join("");
// }

// // Remove a note
// function removeNote(index) {
//   notes.splice(index, 1);
//   renderNotes();
// }

// // Remove a syllabus
// function removeSyllabus(index) {
//   notes.splice(index, 1);
//   renderSyllabus();
// }

// // Remove a video
// function removeVideo(index) {
//   videos.splice(index, 1);
//   renderVideos();
// }

// // Render subjects list
// function renderSubjects() {
//   const subjectsList = document.getElementById("subjectsList");
//   subjectsList.innerHTML = subjects
//     .map(
//       (subject) => `
//         <div class="subject">
//             <h3>${subject.subjectName}</h3>
//             <p>Code: ${subject.code}</p>
//             <p>Branch: ${subject.branch}</p>
//             <div class="subject-actions">
//                 <button class="edit-btn" onclick="editSubject('${subject._id}')">Edit</button>
//                 <button class="delete-btn" onclick="deleteSubject('${subject._id}')">Delete</button>
//             </div>
//         </div>
//     `
//     )
//     .join("");
// }

// // Edit a subject
// function editSubject(id) {
//   editingSubject = subjects.find((s) => s._id === id);
//   if (editingSubject) {
//     document.getElementById("code").value = editingSubject.code;
//     document.getElementById("subjectName").value = editingSubject.subjectName;
//     document.getElementById("branch").value = editingSubject.branch;
//     document.getElementById("akashUrl").value = editingSubject.akashUrl || "";
//     document.getElementById("bookUrl").value = editingSubject.bookUrl || "";
//     document.getElementById("paperAnalysisUrl").value =
//       editingSubject.paperAnalysisUrl || "";

//     notes = [...editingSubject.notes];
//     videos = [...editingSubject.youtube];
//     syllabus = [...editingSubject.unit];

//     renderNotes();
//     renderVideos();
//     renderSyllabus();

//     formTitle.textContent = "Edit Subject";
//     document.querySelector(".submit-btn").textContent = "Update Subject";
//   }
// }

// document
//   .getElementById("syllabusForm")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     try {
//       const response = await fetch("/api/syllabus/update", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           course_code: formData.get("course_code"),
//           semester: formData.get("semester"),
//           syllabus_url: formData.get("syllabus"),
//         }),
//       });

//       if (response.ok) {
//         alert("Syllabus link updated successfully!");
//       } else {
//         throw new Error("Failed to update syllabus link");
//       }
//     } catch (error) {
//       alert("Error updating syllabus link: " + error.message);
//     }
//   });

// // Delete a subject
// async function deleteSubject(id) {
//   if (confirm("Are you sure you want to delete this subject?")) {
//     try {
//       const response = await fetch(`/api/admin/subjects/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${getAuthToken()}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to delete subject");
//       }
//       fetchSubjects();
//     } catch (error) {
//       console.error("Error deleting subject:", error);
//       handleAuthError(error);
//     }
//   }
// }
