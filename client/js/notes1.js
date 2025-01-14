var sem1 = ["CE 101", "CE 102", "CE 103", "CE 104", "CE 105"];
var subName = [
  "elect – II",
  "Principles of Management",
  "Digital Electronics",
  "Data Structure using C",
  "Database Management System",
];
var sem2 = [
  "CHE 102",
  "CHE 104",
  "CHE 106",
  "CHE 108",
  "CHE 110",
  "CE1 201",
  "CE1 202",
  "CE1 203",
  "CE1 204",
  "CE2 201",
];
var sem3 = [
  "CHE 201",
  "CHE 203",
  "CHE 205",
  "CHE 207",
  "CHE 209",
  "CE1 301",
  "CE1 302",
  "CE2 302",
  "CE2 303",
  "CE2 309",
];
var sem4 = ["CHE 202", "CHE 204", "CHE 206", "CHE 208", "CHE 210", "CE1 401"];
var sem5 = [
  "CHE 301",
  "CHE 303",
  "CHE 305",
  "CHE 307",
  "CHE 309",
  "CHE 311",
  "CHE 313",
  "CHE 315",
];
var sem6 = [
  "CHE 302",
  "CHE 304",
  "CHE 306",
  "CHE 308",
  "CHE 310",
  "CHE 312",
  "CHE 314",
  "CHE 316",
];

// Get subject ID from URL
let params = new URL(document.location).searchParams;
let sub_id = params.get("id");
let isCE = sub_id?.includes("CE");

// Fetch subject data from database
async function fetchSubjectData() {
  try {
    const branch = isCE ? "CE" : "CHE";
    const semester = getSemesterFromSubId(sub_id);
    const encodedSubjectCode = encodeURIComponent(sub_id);

    console.log("Fetching subject data:", {
      branch,
      semester,
      subjectCode: sub_id,
    });

    const response = await fetch(
      `/api/public/subjects/details?branch=${branch}&semester=${semester}&subjectCode=${encodedSubjectCode}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch subject data");
    }

    console.log("Fetched subject data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching subject data:", error);
    alert("Error: " + error.message);
    return null;
  }
}

// Get semester number from subject ID
function getSemesterFromSubId(subId) {
  if (sem1.includes(subId)) return "1";
  if (sem2.includes(subId)) return "2";
  if (sem3.includes(subId)) return "3";
  if (sem4.includes(subId)) return "4";
  if (sem5.includes(subId)) return "5";
  if (sem6.includes(subId)) return "6";
  return "1"; // default
}

// Define subject options
const subjectOptions = {
  CE: {
    // .
    1: [
      "Mathematics – I",
      "Technical Communication",
      "Programming with C",
      "Introduction to Computers & IT",
      "Physics",
    ],
  },
};

// Helper function to generate subject code
function generateSubjectCode(branch, semester, subjectName) {
  // Get the index of the subject in the semester's subjects array
  const subjectIndex = subjectOptions[branch][semester].indexOf(subjectName);
  // Generate code like "CHE 101", "CHE 102", etc.
  const codeNumber = parseInt(semester) * 100 + (subjectIndex + 1);
  return `${branch} ${codeNumber}`;
}

// Display subject data
function displaySubjectData(subjectData) {
  if (!subjectData) return;
  console.log("Displaying subject data:", subjectData);

  const semester = getSemesterFromSubId(sub_id);
  const branch = isCE ? "CE" : "CHE";

  // Get predefined subjects for current branch and semester
  const semesterSubjects = subjectOptions[branch]?.[semester] || [];

  // Update subject title and code
  document.getElementById("sub-code").innerText = sub_id;

  // Clear existing content
  const notesContainer = document.getElementById("notes-cont");
  notesContainer.innerHTML = "";

  try {
    // Add subject name heading with dropdown
    notesContainer.innerHTML = `
      <div class="subject-header mb-4">
        <div class="subject-meta">
          <span class="semester-tag">Semester ${semester}</span>
          <span class="code-tag">${subjectData.code}</span>
        </div>
        <div class="dropdown">
          <h2 class="subject-name dropdown-toggle" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false">
            ${subjectData.subjectName}
          </h2>
          <div class="dropdown-menu subject-dropdown-menu">
            ${semesterSubjects
              .map(
                (subjectName) => `
                <a class="dropdown-item" href="notes.html?id=${generateSubjectCode(
                  branch,
                  semester,
                  subjectName
                )}">
                  ${subjectName}
                </a>
              `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    // Add Notes button
    if (subjectData.notes && subjectData.notes.length > 0) {
      notesContainer.innerHTML += `
        <a class="notesBtn" id="notesPop" onclick="openNotes()" href="#">
          <i class="fa fa-sticky-note fa-lg mr-2"></i>
          Notes
        </a>
      `;
    }

    // Add other resource buttons if URLs exist
    if (subjectData.akashUrl) {
      notesContainer.innerHTML += `
        <a class="notesBtn" href='${subjectData.akashUrl}' target="_blank">
          <i class="fa fa-bookmark fa-lg mr-2"></i>
          PYQs
        </a>    
      `;
    }

    // Add Book button if URL exists
    if (subjectData.bookUrl) {
      notesContainer.innerHTML += `
        <a class="notesBtn" href='${subjectData.bookUrl}' target="_blank">
          <i class="fa fa-book fa-lg mr-2"></i>
          Book
        </a>
      `;
    }

    // Add Paper Analysis button if URL exists
    if (subjectData.paperAnalysisUrl) {
      notesContainer.innerHTML += `
        <a class="notesBtn" href='${subjectData.paperAnalysisUrl}' target="_blank">
          <i class="fa fa-file-text-o fa-lg mr-2"></i>
          Paper Analysis
        </a>
      `;
    }

    // Add Videos button if videos exist
    if (subjectData.youtube && subjectData.youtube.length > 0) {
      notesContainer.innerHTML += `
        <a class="notesBtn" onclick="openVideos()" href="#">
          <i class="fa fa-video-camera fa-lg mr-2"></i>
          Videos
        </a>
      `;
    }

    // Store notes data for later use
    window.notesData = subjectData;
  } catch (error) {
    console.error("Error displaying subject data:", error);
    notesContainer.innerHTML = "<p>Error loading subject content</p>";
  }
}

// Open notes modal
function openNotes() {
  const subjectData = window.notesData;
  try {
    if (!subjectData || !subjectData.notes || subjectData.notes.length === 0) {
      alert("No notes available for this subject");
      return;
    }

    if (subjectData.notes.length === 1) {
      window.open(subjectData.notes[0].url);
      return;
    }

    $("#notesModalCenter").modal({ keyboard: false });

    const notesPopBody = document.getElementById("notes-pop-body");
    notesPopBody.innerHTML = subjectData.notes
      .map(
        (note) => `
        <a class="notesPopBtn" href='${note.url}' target="_blank">
          <i class="fa fa-sticky-note fa-lg mr-2"></i>
          ${note.name}
        </a>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error opening notes:", error);
    alert("Error loading notes. Please try again.");
  }
}

// Open videos page
function openVideos() {
  const subjectData = window.notesData;
  try {
    if (
      !subjectData ||
      !subjectData.youtube ||
      subjectData.youtube.length === 0
    ) {
      alert("No videos available for this subject");
      return;
    }

    if (subjectData.youtube.length === 1) {
      window.open(subjectData.youtube[0].url);
      return;
    }

    $("#videosModalCenter").modal({ keyboard: false });

    const videosPopBody = document.getElementById("videos-pop-body");
    videosPopBody.innerHTML = subjectData.youtube
      .map(
        (video) => `
        <a class="notesPopBtn" href='${video.url}' target="_blank">
          <i class="fa fa-video-camera fa-lg mr-2"></i>
          ${video.name}
        </a>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error opening videos:", error);
    alert("Error loading videos. Please try again.");
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
  // Set semester title
  const semester = getSemesterFromSubId(sub_id);
  const semTitle = document.getElementById("sem-title");
  if (semTitle) {
    semTitle.innerText = `Semester ${semester}`;
  }

  const subjectData = await fetchSubjectData();
  if (subjectData) {
    displaySubjectData(subjectData);
  }
});
