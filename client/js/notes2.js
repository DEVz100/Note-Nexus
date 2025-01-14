var sem1 = [
  "EL 101",
  "EL 103",
  "EL 105",
  "EL 107",
  "EL 109",
  "BME1 101",
  "BME1 102",
  "BME1 103",
  "BME1 104",
  "BME1 105",
];
var sem2 = [
  "EL 102",
  "EL 104",
  "EL 106",
  "EL 108",
  "EL 110",
  "BME1 201",
  "BME1 202",
  "BME1 203",
  "BME1 204",
  "BME2 201",
];
var sem3 = [
  "EL 201",
  "EL 203",
  "EL 205",
  "EL 207",
  "EL 209",
  "BME1 301",
  "BME1 302",
  "BME2 302",
  "BME2 303",
  "BME2 309",
];
var sem4 = ["EL 202", "EL 204", "EL 206", "EL 208", "EL 210", "BME1 401"];
var sem5 = [
  "EL 301",
  "EL 303",
  "EL 305",
  "EL 307",
  "EL 309",
  "EL 311",
  "EL 313",
  "EL 315",
];
var sem6 = [
  "EL 302",
  "EL 304",
  "EL 306",
  "EL 308",
  "EL 310",
  "EL 312",
  "EL 314",
  "EL 316",
];

let params = new URL(document.location).searchParams;
let sub_id = params.get("id");
let isBME = sub_id.includes("BME");

if (sub_id === null) sub_id = "EL 101";
var selectedSem = [];
var sly_index = 0;
if (!isBME) {
  var course_code = sub_id.replace("EL ", "20");
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

if (!isBME) {
  $.getJSON("./assets/nom2.json", function (data) {
    selectedSem.forEach((el) => {
      if (el === sub_id) {
        document.getElementById(
          "sub-drop-cont"
        ).innerHTML += ` <a class="dropdown-item active" href="./notes2.html?id=${el}">
            
                ${data.EL[el]["SubjectName"]}
                </a>`;
      } else {
        if (data.EL[el] != null)
          document.getElementById(
            "sub-drop-cont"
          ).innerHTML += ` <a class="dropdown-item" href="./notes2.html?id=${el}">
                
                ${data.EL[el]["SubjectName"]}
                </a>`;
      }
    });
    notesData = data.EL[sub_id];
    getData();
  });
} else {
  document.getElementById("courseName").innerText = "Bio Medical Engineering";
  document
    .getElementById("sem-title")
    .setAttribute("href", "./semester2.html?id=BME");
  $.getJSON("./assets/BME.json", function (data) {
    selectedSem.forEach((el) => {
      if (el === sub_id) {
        document.getElementById(
          "sub-drop-cont"
        ).innerHTML += ` <a class="dropdown-item active" href="./notes2.html?id=${el}">
            
                ${data.BME[el]["SubjectName"]}
                </a>`;
      } else {
        if (data.BME[el] != null)
          document.getElementById(
            "sub-drop-cont"
          ).innerHTML += ` <a class="dropdown-item" href="./notes2.html?id=${el}">
                
                ${data.BME[el]["SubjectName"]}
                </a>`;
      }
    });
    notesData = data.BME[sub_id];
    getData();
  });
}
const SylLink = isBME ? "./assets/BMEsyll.json" : "./assets/course2.json";

$.getJSON(SylLink, function (data) {
  const semesterData = data[0].semester[sly_index];
  const subjects = semesterData.subjects;

  for (const subjectKey in subjects) {
    const subject = subjects[subjectKey];

    if (subject.paper_id.toString() === course_code) {
      renderSyllabus(subject.syllabus);
      return; // Exit once the correct subject is found
    }
  }
});

function renderSyllabus(syllabus) {
  const syllabusContainer = document.getElementById("course-sly");
  syllabusContainer.innerHTML = ""; // Clear previous content

  for (const unitKey in syllabus) {
    const unit = syllabus[unitKey];
    const { title, chapters } = unit;

    syllabusContainer.innerHTML += `
      <div class="sly-cont">
        <h2 class="sly-unit">${unitKey.replace("_", "-")}</h2>
        <h3 class="sly-title">${title}</h3>
        <p class="sly-chap">${chapters}</p>
      </div>
    `;
  }
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
  window.open((location.href = "vid2.html?id=" + sub_id));
}
