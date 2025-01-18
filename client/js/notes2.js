// var sem1 = [
//   "EL 101",
//   "EL 103",
//   "EL 105",
//   "EL 107",
//   "EL 109",
//   "BME1 101",
//   "BME1 102",
//   "BME1 103",
//   "BME1 104",
//   "BME1 105",
// ];
// var sem2 = [
//   "EL 102",
//   "EL 104",
//   "EL 106",
//   "EL 108",
//   "EL 110",
//   "BME1 201",
//   "BME1 202",
//   "BME1 203",
//   "BME1 204",
//   "BME2 201",
// ];
// var sem3 = [
//   "EL 201",
//   "EL 203",
//   "EL 205",
//   "EL 207",
//   "EL 209",
//   "BME1 301",
//   "BME1 302",
//   "BME2 302",
//   "BME2 303",
//   "BME2 309",
// ];
// var sem4 = ["EL 202", "EL 204", "EL 206", "EL 208", "EL 210", "BME1 401"];
// var sem5 = [
//   "EL 301",
//   "EL 303",
//   "EL 305",
//   "EL 307",
//   "EL 309",
//   "EL 311",
//   "EL 313",
//   "EL 315",
// ];
// var sem6 = [
//   "EL 302",
//   "EL 304",
//   "EL 306",
//   "EL 308",
//   "EL 310",
//   "EL 312",
//   "EL 314",
//   "EL 316",
// ];

// let params = new URL(document.location).searchParams;
// let sub_id = params.get("id");
// let isBME = sub_id.includes("BME");

// if (sub_id === null) sub_id = "EL 101";
// var selectedSem = [];
// var sly_index = 0;
// if (!isBME) {
//   var course_code = sub_id.replace("EL ", "20");
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

// if (!isBME) {
//   $.getJSON("./assets/nom2.json", function (data) {
//     selectedSem.forEach((el) => {
//       if (el === sub_id) {
//         document.getElementById(
//           "sub-drop-cont"
//         ).innerHTML += ` <a class="dropdown-item active" href="./notes2.html?id=${el}">
            
//                 ${data.EL[el]["SubjectName"]}
//                 </a>`;
//       } else {
//         if (data.EL[el] != null)
//           document.getElementById(
//             "sub-drop-cont"
//           ).innerHTML += ` <a class="dropdown-item" href="./notes2.html?id=${el}">
                
//                 ${data.EL[el]["SubjectName"]}
//                 </a>`;
//       }
//     });
//     notesData = data.EL[sub_id];
//     getData();
//   });
// } else {
//   document.getElementById("courseName").innerText = "Bio Medical Engineering";
//   document
//     .getElementById("sem-title")
//     .setAttribute("href", "./semester2.html?id=BME");
//   $.getJSON("./assets/BME.json", function (data) {
//     selectedSem.forEach((el) => {
//       if (el === sub_id) {
//         document.getElementById(
//           "sub-drop-cont"
//         ).innerHTML += ` <a class="dropdown-item active" href="./notes2.html?id=${el}">
            
//                 ${data.BME[el]["SubjectName"]}
//                 </a>`;
//       } else {
//         if (data.BME[el] != null)
//           document.getElementById(
//             "sub-drop-cont"
//           ).innerHTML += ` <a class="dropdown-item" href="./notes2.html?id=${el}">
                
//                 ${data.BME[el]["SubjectName"]}
//                 </a>`;
//       }
//     });
//     notesData = data.BME[sub_id];
//     getData();
//   });
// }
// const SylLink = isBME ? "./assets/BMEsyll.json" : "./assets/course2.json";

// $.getJSON(SylLink, function (data) {
//   const semesterData = data[0].semester[sly_index];
//   const subjects = semesterData.subjects;

//   for (const subjectKey in subjects) {
//     const subject = subjects[subjectKey];

//     if (subject.paper_id.toString() === course_code) {
//       renderSyllabus(subject.syllabus);
//       return; // Exit once the correct subject is found
//     }
//   }
// });

// function renderSyllabus(syllabus) {
//   const syllabusContainer = document.getElementById("course-sly");
//   syllabusContainer.innerHTML = ""; // Clear previous content

//   for (const unitKey in syllabus) {
//     const unit = syllabus[unitKey];
//     const { title, chapters } = unit;

//     syllabusContainer.innerHTML += `
//       <div class="sly-cont">
//         <h2 class="sly-unit">${unitKey.replace("_", "-")}</h2>
//         <h3 class="sly-title">${title}</h3>
//         <p class="sly-chap">${chapters}</p>
//       </div>
//     `;
//   }
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
//   window.open((location.href = "vid2.html?id=" + sub_id));
// }



var sem1 = ["EL 101", "EL 102", "EL 103", "EL 104", "EL 105", "EL 106", "EL 107", "EL 108", "EL 109", "EL 110"];
var sem2 = ["EL 201", "EL 202", "EL 203", "EL 204", "EL 205", "EL 206", "EL 207", "EL 208", "EL 209", "EL 210"];
var sem3 = ["EL 301", "EL 302", "EL 303", "EL 304", "EL 305", "EL 306", "EL 307", "EL 308", "EL 309"];
var sem4 = ["EL 401", "EL 402", "EL 403", "EL 404", "EL 405", "EL 406", "EL 407", "EL 408", "EL 409"];
var sem5 = ["EL 501", "EL 502", "EL 503", "EL 504", "EL 505", "EL 506", "EL 507", "EL 508", "EL 509"];
var sem6 = ["EL 601", "EL 602", "EL 603", "EL 604", "EL 605", "EL 606", "EL 607", "EL 608"];

// Get subject ID from URL
let params = new URL(document.location).searchParams;
let sub_id = params.get("id");
let isEL = sub_id?.includes("EL");

async function fetchSyllabusData() {
  try {
    // Extract branch and code from sub_id (e.g., "EL 101")
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
    const branch = isEL ? "EL" : "BME";                   //Tertery Operator   //
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
      "Sports and Yoga"
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
      "Engineering Workshop Practice"
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
      "Mechanical Engineering Lab"   
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
      "Minor Project"
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
      "Major Project"
    ],
    6: [
      "Entrepreneurship and Startup",
      "Energy Conservation & Audit (EE)/	Microcontroller & PLC/	Electric Vehicles",
	    "Solar Power Technologies/Energy Conservation & Management/	Electrification of Residential Buildings/ Electric Vehicles & Traction",
	    "Indian Constitution",
	    "Electrical Computer Aided Drafting Lab",
	    "Industrial Automation Lab",
	    "Applied Electrical Testing Lab/ Modelling and simulation Lab/ Advanced Solar Photovoltaic Lab",
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
  // Generate code like "EL 101", "EL 102", etc.
  const codeNumber = parseInt(semester) * 100 + (subjectIndex + 1);
  return `${branch} ${codeNumber}`;
}

// Display subject data
function displaySubjectData(subjectData) {
  if (!subjectData) return;
  console.log("Displaying subject data:", subjectData);

  const semester = getSemesterFromSubId(sub_id);
  const branch = isEL ? "EL" : "BME";                                    //    Tertery Operator   //

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

