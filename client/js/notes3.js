// var sem1 = [
//   "BME 101",
//   "BME 103",
//   "BME 105",
//   "BME 107",
//   "BME 109",
//   "CHE1 101",
//   "CHE1 102",
//   "CHE1 103",
//   "CHE1 104",
//   "CHE1 105",
// ];
// var sem2 = [
//   "BME 102",
//   "BME 104",
//   "BME 106",
//   "BME 108",
//   "BME 110",
//   "CHE1 201",
//   "CHE1 202",
//   "CHE1 203",
//   "CHE1 204",
//   "CHE2 201",
// ];
// var sem3 = [
//   "BME 201",
//   "BME 203",
//   "BME 205",
//   "BME 207",
//   "BME 209",
//   "CHE1 301",
//   "CHE1 302",
//   "CHE2 302",
//   "CHE2 303",
//   "CHE2 309",
// ];
// var sem4 = ["BME 202", "BME 204", "BME 206", "BME 208", "BME 210", "CHE1 401"];
// var sem5 = [
//   "BME 301",
//   "BME 303",
//   "BME 305",
//   "BME 307",
//   "BME 309",
//   "BME 311",
//   "BME 313",
//   "BME 315",
// ];
// var sem6 = [
//   "BME 302",
//   "BME 304",
//   "BME 306",
//   "BME 308",
//   "BME 310",
//   "BME 312",
//   "BME 314",
//   "BME 316",
// ];

// let params = new URL(document.location).searchParams;
// let sub_id = params.get("id");
// let isCHE = sub_id.includes("CHE");

// // Replace JSON fetching with database fetch
// async function fetchSubjectData() {
//   try {
//     const response = await fetch(`/api/subjects/${sub_id}`);
//     const data = await response.json();

//     // Populate dropdown items
//     selectedSem.forEach((el) => {
//       if (el === sub_id) {
//         document.getElementById("sub-drop-cont").innerHTML += `
//                     <a class="dropdown-item active" href="./notes3.html?id=${el}">
//                         ${data.subjects[el].SubjectName}
//                     </a>`;
//       } else {
//         if (data.subjects[el] != null) {
//           document.getElementById("sub-drop-cont").innerHTML += `
//                         <a class="dropdown-item" href="./notes3.html?id=${el}">
//                             ${data.subjects[el].SubjectName}
//                         </a>`;
//         }
//       }
//     });

//     notesData = data.subjects[sub_id];
//     getData();
//   } catch (error) {
//     console.error("Error fetching subject data:", error);
//   }
// }

// // Replace syllabus JSON fetching
// async function fetchSyllabusData() {
//   try {
//     const response = await fetch(`/api/syllabus/${sub_id}`);
//     const data = await response.json();

//     const syllabus = data.syllabus;

//     syllabus.forEach((unit) => {
//       document.getElementById("course-sly").innerHTML += `
//                 <div class="sly-cont">
//                     <h2 class="sly-unit">
//                         ${unit.unit_name}
//                     </h2>
//                     <h3 class="sly-title">
//                         ${unit.title}
//                     </h3>
//                     <p class="sly-chap">
//                         ${unit.chapters}
//                     </p>
//                 </div>`;
//     });
//   } catch (error) {
//     console.error("Error fetching syllabus data:", error);
//   }
// }

// // Initialize the page
// document.addEventListener("DOMContentLoaded", () => {
//   if (sub_id === null) sub_id = "BME 101";

//   document.getElementById("sub-code").innerText = sub_id;

//   // Set course name and semester title based on branch
//   if (isCHE) {
//     document.getElementById("courseName").innerText =
//       "Computer Hardware Engineering";
//     document
//       .getElementById("sem-title")
//       .setAttribute("href", "./semester3.html?id=CHE");
//   }

//   // Determine semester
//   const semesterArrays = [sem1, sem2, sem3, sem4, sem5, sem6];
//   for (let i = 0; i < semesterArrays.length; i++) {
//     if (semesterArrays[i].includes(sub_id)) {
//       document.getElementById("sem-title").innerText = `Semester ${i + 1}`;
//       selectedSem = semesterArrays[i];
//       sly_index = i;
//       break;
//     }
//   }

//   // Fetch data from database
//   fetchSubjectData();
//   fetchSyllabusData();
// });

// var selectedSem = [];
// var sly_index = 0;
// if (!isCHE) {
//   var course_code = sub_id.replace("BME ", "20");
// } else {
//   var course_code = sub_id;
// }
// document.getElementById("sub-code").innerText = sub_id;

// if (sem1.includes(sub_id)) {
//   document.getElementById("sem-title").innerText = "Semester 1";
//   selectedSem = sem1;
//   sly_index = 0;
// } else if (sem2.includes(sub_id)) {
//   document.getElementById("sem-title").innerText = "Semester 2";
//   selectedSem = sem2;
//   sly_index = 1;
// } else if (sem3.includes(sub_id)) {
//   document.getElementById("sem-title").innerText = "Semester 3";
//   selectedSem = sem3;
//   sly_index = 2;
// } else if (sem4.includes(sub_id)) {
//   document.getElementById("sem-title").innerText = "Semester 4";
//   selectedSem = sem4;
//   sly_index = 3;
// } else if (sem5.includes(sub_id)) {
//   document.getElementById("sem-title").innerText = "Semester 5";
//   selectedSem = sem5;
//   sly_index = 4;
// } else if (sem6.includes(sub_id)) {
//   document.getElementById("sem-title").innerText = "Semester 6";
//   selectedSem = sem6;
//   sly_index = 5;
// } else {
//   document.getElementById("sem-title").innerText = "Semester 1";
//   selectedSem = sem1;
//   sly_index = 0;
// }

// var notesData = {};
// var notes_collec;
// var notes_collec_object;

// function getData() {
//   document.getElementById(
//     "notes-cont"
//   ).innerHTML += ` <a class="notesBtn" id="notesPop" onclick="openNotes()" href="#">
//         <i class="fa fa-sticky-note fa-lg mr-2"></i>
//         Notes
//         </a>`;

//   if (notesData["Akash_url"] !== "") {
//     document.getElementById(
//       "notes-cont"
//     ).innerHTML += ` <a class="notesBtn" href='${notesData["Akash_url"]}' target="_blank">
//             <i class="fa fa-bookmark fa-lg mr-2"></i>
//             PYQs
//             </a>`;
//   }
//   if (notesData["Book_url"] !== "") {
//     document.getElementById(
//       "notes-cont"
//     ).innerHTML += ` <a class="notesBtn" href='${notesData["Book_url"]}' target="_blank">
//             <i class="fa fa-book fa-lg mr-2"></i>
//             Book
//             </a>`;
//   }
//   if (notesData["Paper_analysis_url"] !== "") {
//     document.getElementById(
//       "notes-cont"
//     ).innerHTML += ` <a class="notesBtn" href='${notesData["Paper_analysis_url"]}' target="_blank">
//             <i class="fa fa-file-text-o fa-lg mr-2"></i>
//             Paper Analysis
//             </a>`;
//   }
//   document.getElementById(
//     "notes-cont"
//   ).innerHTML += ` <a class="notesBtn" onclick="openVideos()" href="#">
//         <i class="fa fa-video-camera fa-lg mr-2"></i>
//         Videos
//         </a>`;

//   var res = notesData["SubjectName"].substr(0, 15);
//   if (notesData["SubjectName"].length > 15) res = res + "...";
//   document.getElementById("sub-title").innerText = res;
//   notes_collec = notesData["Notes"];
//   notes_collec_object = Object.keys(notes_collec);
// }

// function openNotes() {
//   if (notes_collec_object.length <= 1) {
//     if (notes_collec[notes_collec_object[0]] !== "")
//       window.open(notes_collec[notes_collec_object[0]]);
//     else {
//       $(".toast").toast("show");
//     }
//   } else {
//     $("#notesModalCenter").modal({
//       keyboard: false,
//     });
//     document.getElementById("notes-pop-body").innerHTML = "";
//     for (i = 0; i < notes_collec_object.length; i++) {
//       document.getElementById(
//         "notes-pop-body"
//       ).innerHTML += `<a class="notesPopBtn" href='${
//         notes_collec[notes_collec_object[i]]
//       }' target="_blank">
//             <i class="fa fa-sticky-note fa-lg mr-2"></i>
//             ${notes_collec_object[i]}
//             </a>`;
//     }
//   }
// }

// function openVideos() {
//   window.open((location.href = "vid3.html?id=" + sub_id));
// }


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
      "Basic Electronics",
      "Communication Skills in English Lab",
      "Applied Physics Lab",
      "Fundamentals of Electrical & Electronics Engineering Lab",
      "Electronics Tinkering Workshop",
      "Engineering Workshop Practice"
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
      "Servicing Fundamentals Lab"
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
      "Minor Project"
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
      "Major Project"
    ],
    6: [
      "Entrepreneurship and Startup",
      "Introduction to 5G/ Advanced Medical Instrumentation and Prosthetics/	Signals and Systems/ Bio MEMS",
	    "Healthcare Informatics/ Rehabilitation Engineering/ Biomedical Instrumentation/ IoT in Healthcare",
	    "Indian Constitution",
	    "Biomedical Instrumentation Lab II	",
	    "Computer Hardware and Data Communication Lab",
	    "Simulation Lab with Numerical software/ Biomedical Equipment Servicing and Maintenance Lab",
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
