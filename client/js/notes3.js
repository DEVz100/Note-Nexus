var sem1 = [
  "BME 101",
  "BME 103",
  "BME 105",
  "BME 107",
  "BME 109",
  "CHE1 101",
  "CHE1 102",
  "CHE1 103",
  "CHE1 104",
  "CHE1 105",
];
var sem2 = [
  "BME 102",
  "BME 104",
  "BME 106",
  "BME 108",
  "BME 110",
  "CHE1 201",
  "CHE1 202",
  "CHE1 203",
  "CHE1 204",
  "CHE2 201",
];
var sem3 = [
  "BME 201",
  "BME 203",
  "BME 205",
  "BME 207",
  "BME 209",
  "CHE1 301",
  "CHE1 302",
  "CHE2 302",
  "CHE2 303",
  "CHE2 309",
];
var sem4 = ["BME 202", "BME 204", "BME 206", "BME 208", "BME 210", "CHE1 401"];
var sem5 = [
  "BME 301",
  "BME 303",
  "BME 305",
  "BME 307",
  "BME 309",
  "BME 311",
  "BME 313",
  "BME 315",
];
var sem6 = [
  "BME 302",
  "BME 304",
  "BME 306",
  "BME 308",
  "BME 310",
  "BME 312",
  "BME 314",
  "BME 316",
];

let params = new URL(document.location).searchParams;
let sub_id = params.get("id");
let isCHE = sub_id.includes("CHE");

// Replace JSON fetching with database fetch
async function fetchSubjectData() {
  try {
    const response = await fetch(`/api/subjects/${sub_id}`);
    const data = await response.json();

    // Populate dropdown items
    selectedSem.forEach((el) => {
      if (el === sub_id) {
        document.getElementById("sub-drop-cont").innerHTML += `
                    <a class="dropdown-item active" href="./notes3.html?id=${el}">
                        ${data.subjects[el].SubjectName}
                    </a>`;
      } else {
        if (data.subjects[el] != null) {
          document.getElementById("sub-drop-cont").innerHTML += `
                        <a class="dropdown-item" href="./notes3.html?id=${el}">
                            ${data.subjects[el].SubjectName}
                        </a>`;
        }
      }
    });

    notesData = data.subjects[sub_id];
    getData();
  } catch (error) {
    console.error("Error fetching subject data:", error);
  }
}

// Replace syllabus JSON fetching
async function fetchSyllabusData() {
  try {
    const response = await fetch(`/api/syllabus/${sub_id}`);
    const data = await response.json();

    const syllabus = data.syllabus;

    syllabus.forEach((unit) => {
      document.getElementById("course-sly").innerHTML += `
                <div class="sly-cont">
                    <h2 class="sly-unit">
                        ${unit.unit_name}
                    </h2>
                    <h3 class="sly-title">
                        ${unit.title}
                    </h3>
                    <p class="sly-chap">
                        ${unit.chapters}
                    </p>
                </div>`;
    });
  } catch (error) {
    console.error("Error fetching syllabus data:", error);
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  if (sub_id === null) sub_id = "BME 101";

  document.getElementById("sub-code").innerText = sub_id;

  // Set course name and semester title based on branch
  if (isCHE) {
    document.getElementById("courseName").innerText =
      "Computer Hardware Engineering";
    document
      .getElementById("sem-title")
      .setAttribute("href", "./semester3.html?id=CHE");
  }

  // Determine semester
  const semesterArrays = [sem1, sem2, sem3, sem4, sem5, sem6];
  for (let i = 0; i < semesterArrays.length; i++) {
    if (semesterArrays[i].includes(sub_id)) {
      document.getElementById("sem-title").innerText = `Semester ${i + 1}`;
      selectedSem = semesterArrays[i];
      sly_index = i;
      break;
    }
  }

  // Fetch data from database
  fetchSubjectData();
  fetchSyllabusData();
});

var selectedSem = [];
var sly_index = 0;
if (!isCHE) {
  var course_code = sub_id.replace("BME ", "20");
} else {
  var course_code = sub_id;
}
document.getElementById("sub-code").innerText = sub_id;

if (sem1.includes(sub_id)) {
  document.getElementById("sem-title").innerText = "Semester 1";
  selectedSem = sem1;
  sly_index = 0;
} else if (sem2.includes(sub_id)) {
  document.getElementById("sem-title").innerText = "Semester 2";
  selectedSem = sem2;
  sly_index = 1;
} else if (sem3.includes(sub_id)) {
  document.getElementById("sem-title").innerText = "Semester 3";
  selectedSem = sem3;
  sly_index = 2;
} else if (sem4.includes(sub_id)) {
  document.getElementById("sem-title").innerText = "Semester 4";
  selectedSem = sem4;
  sly_index = 3;
} else if (sem5.includes(sub_id)) {
  document.getElementById("sem-title").innerText = "Semester 5";
  selectedSem = sem5;
  sly_index = 4;
} else if (sem6.includes(sub_id)) {
  document.getElementById("sem-title").innerText = "Semester 6";
  selectedSem = sem6;
  sly_index = 5;
} else {
  document.getElementById("sem-title").innerText = "Semester 1";
  selectedSem = sem1;
  sly_index = 0;
}

var notesData = {};
var notes_collec;
var notes_collec_object;

function getData() {
  document.getElementById(
    "notes-cont"
  ).innerHTML += ` <a class="notesBtn" id="notesPop" onclick="openNotes()" href="#">
        <i class="fa fa-sticky-note fa-lg mr-2"></i>
        Notes
        </a>`;

  if (notesData["Akash_url"] !== "") {
    document.getElementById(
      "notes-cont"
    ).innerHTML += ` <a class="notesBtn" href='${notesData["Akash_url"]}' target="_blank">
            <i class="fa fa-bookmark fa-lg mr-2"></i>
            PYQs
            </a>`;
  }
  if (notesData["Book_url"] !== "") {
    document.getElementById(
      "notes-cont"
    ).innerHTML += ` <a class="notesBtn" href='${notesData["Book_url"]}' target="_blank">
            <i class="fa fa-book fa-lg mr-2"></i>
            Book
            </a>`;
  }
  if (notesData["Paper_analysis_url"] !== "") {
    document.getElementById(
      "notes-cont"
    ).innerHTML += ` <a class="notesBtn" href='${notesData["Paper_analysis_url"]}' target="_blank">
            <i class="fa fa-file-text-o fa-lg mr-2"></i>
            Paper Analysis
            </a>`;
  }
  document.getElementById(
    "notes-cont"
  ).innerHTML += ` <a class="notesBtn" onclick="openVideos()" href="#">
        <i class="fa fa-video-camera fa-lg mr-2"></i>
        Videos
        </a>`;

  var res = notesData["SubjectName"].substr(0, 15);
  if (notesData["SubjectName"].length > 15) res = res + "...";
  document.getElementById("sub-title").innerText = res;
  notes_collec = notesData["Notes"];
  notes_collec_object = Object.keys(notes_collec);
}

function openNotes() {
  if (notes_collec_object.length <= 1) {
    if (notes_collec[notes_collec_object[0]] !== "")
      window.open(notes_collec[notes_collec_object[0]]);
    else {
      $(".toast").toast("show");
    }
  } else {
    $("#notesModalCenter").modal({
      keyboard: false,
    });
    document.getElementById("notes-pop-body").innerHTML = "";
    for (i = 0; i < notes_collec_object.length; i++) {
      document.getElementById(
        "notes-pop-body"
      ).innerHTML += `<a class="notesPopBtn" href='${
        notes_collec[notes_collec_object[i]]
      }' target="_blank">
            <i class="fa fa-sticky-note fa-lg mr-2"></i>
            ${notes_collec_object[i]}
            </a>`;
    }
  }
}

function openVideos() {
  window.open((location.href = "vid3.html?id=" + sub_id));
}
