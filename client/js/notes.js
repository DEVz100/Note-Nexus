var sem1 = ["CHE 101", "CHE 102", "CHE 103", "CHE 104", "CHE 105", "CHE 106", "CHE 107", "CHE 108", "CHE 109", "CHE 110"];
var sem2 = ["CHE 201", "CHE 202", "CHE 203", "CHE 204", "CHE 205", "CHE 206", "CHE 207", "CHE 208", "CHE 209", "CHE 210"];
var sem3 = ["CHE 301", "CHE 302", "CHE 303", "CHE 304", "CHE 305", "CHE 306", "CHE 307", "CHE 308", "CHE 309"];
var sem4 = ["CHE 401", "CHE 402", "CHE 403", "CHE 404", "CHE 405", "CHE 406", "CHE 407", "CHE 408", "CHE 409"];
var sem5 = ["CHE 501", "CHE 502", "CHE 503", "CHE 504", "CHE 505", "CHE 506", "CHE 507", "CHE 508", "CHE 509"];
var sem6 = ["CHE 601", "CHE 602", "CHE 603", "CHE 604", "CHE 605", "CHE 606", "CHE 607", "CHE 608"];

// Get subject ID from URL
let params = new URL(document.location).searchParams;
let sub_id = params.get("id");
let isCHE = sub_id?.includes("CHE");

async function fetchSyllabusData() {
  try {
    // Extract branch and code from sub_id (e.g., "CHE 101")
    const [branch, code] = sub_id.split(' ');
    const semester = Math.floor(parseInt(code) / 100);  // e.g., 101 -> semester 1

    const response = await fetch(`/api/admin/subjects/details?branch=${branch}&semester=${semester}&subjectCode=${sub_id}`);
    const data = response.ok ? await response.json() : null;

    if (!data || !data.syllabus) {
      document.getElementById("course-sly").innerHTML = '<p>No syllabus available</p>';
      return;
    }

    console.log('Syllabus data:', data); // Debug log to see what we're getting

    const syllabusList = data.syllabus.map(unit => `
      <div class="sly-cont">
        <h2 class="sly-unit">Unit ${unit.unit}</h2>
        <h3 class="sly-title">${unit.title}</h3>
        <p class="sly-chap">${unit.content}</p>
      </div>
    `).join('');

    document.getElementById("course-sly").innerHTML = syllabusList;
  } catch (error) {
    console.error('Error fetching syllabus:', error);
    document.getElementById("course-sly").innerHTML = '<p>Error loading syllabus</p>';
  }
}

// Fetch subject data from database
async function fetchSubjectData() {
  try {
    const branch = isCHE ? "CHE" : "CE";
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
      "Sports and Yoga"
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
      "Engineering Workshop Practice"
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
      "Application Development Lab"
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
      "Minor Project"
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
      "Major Project"
    ],
    6: [
      "Entrepreneurship and Startup",
      "Software Testing/ Introduction to 5G/ Fundamentals of Artificial Intelligence & Machine Learning/ Database Management Systems",
      "Introduction to IoT/	Multimedia/ Cloud Computing/ Computer System Hardware",
      "Indian Constitution",
      "Programming Smart Device Lab",
      "Ethical Hacking Lab",
      "Software Testing Lab/ Fundamentals of Artificial Intelligence & Machine Learning Lab/ Database Management Systems Lab",
      "Major Project"
    ],
    // ... other semesters
  },
  // CE: {
  //   1: [
  //     "Mathematics – I",
  //   ],
  // },
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
  const branch = isCHE ? "CHE" : "CE";

  // Get predefined subjects for current branch and semester
  const semesterSubjects = subjectOptions[branch]?.[semester] || [];

  // Update subject title and code
  document.getElementById("sub-code").innerText = sub_id;

  // Clear existing content
  const notesContainer = document.getElementById("notes-cont");
  notesContainer.innerHTML = "";

  const syllabusContainer = document.getElementById("course-sly");
  syllabusContainer.innerHTML = "";

  try {
    // 

    if (subjectData.syllabus && subjectData.syllabus.length > 0) {
      syllabusContainer.innerHTML = subjectData.syllabus.map(item => `
        <div class="sly-cont">
          
          <h2 class="sly-unit">Unit ${item.unit}</h2>
          <h4 class="sly-title">${item.title}</h4>
          <p class="sly-chap">${item.content}</p>
        </div>
      `).join('');
    }
    else if(subjectData.syllabus && subjectData.syllabus.length === 1) {
      syllabusContainer.innerHTML = `
      <div class="sly-cont">
       <h3 class="sly-title ">${subjectData.subjectName}</h3>
       <h2 class="sly-unit">Unit ${subjectData.syllabus[0].unit}</h2>
       <h4 class="sly-title">${subjectData.syllabus[0].title}</h4>
       <p class="sly-chap">${subjectData.syllabus[0].content}</p>
      </div>
    `;
    }
    else {
      syllabusContainer.innerHTML = '<p>No syllabus available</p>';
    }
 

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
