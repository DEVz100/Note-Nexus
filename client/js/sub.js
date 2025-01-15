var sem1 = ["CHE 101", "CHE 102", "CHE 103", "CHE 104", "CHE 105"];
var subName = [
  "Mathematics – I",
  "Technical Communication",
  "Programming with C",
  "Introduction to Computers & IT",
  "Physics",
];
var sem2 = ["CHE 201", "CHE 202", "CHE 203", "CHE 204", "CHE 205"];
var subName2 = [
  "elect – II",
  "Principles of Management",
  "Digital Electronics",
  "Data Structure using C",
  "Database Management System",
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
var selectedSem = [];

let params = new URL(document.location).searchParams;
sem_id = params.get("id");
course_id = params.get("course");
console.log(sem_id);
console.log(course_id);
if (course_id == "CE") {
  document.getElementById("CourseName").innerText = "Computer Engineering";
  document.getElementById("cheSems").style.display = "none";
  document.getElementById("semSyllabus").style.display = "none";
} else {
  document.getElementById("ceSems").style.display = "none";
}

async function getSyllabusLink(semester, course) {
  try {
    const response = await fetch(`/api/syllabus/${course}/${semester}`);
    const data = await response.json();
    return data.syllabus_url;
  } catch (error) {
    console.error("Error fetching syllabus link:", error);
    return null;
  }
}

async function updateSemesterContent(sem_id) {
  const syllabusLink =
    (await getSyllabusLink(sem_id, course_id)) ||
    "https://drive.google.com/file/d/1NHEBDX6abXhIr_LQ9_7bxFPUZaANIRQV/view"; // fallback URL

  switch (sem_id) {
    case "sem1":
      selectedSem = sem1;
      document.getElementById("sem-title").innerText = "Semester 1";
      document.getElementById("sem-syllabus").href = syllabusLink;
      document
        .getElementsByClassName("sem-drop-menu")[0]
        .getElementsByClassName("dropdown-item")[0].className += " active";
      break;
    case "sem2":
      selectedSem = sem2;
      document.getElementById("sem-title").innerText = "Semester 2";
      document.getElementById("sem-syllabus").href = syllabusLink;
      document
        .getElementsByClassName("sem-drop-menu")[0]
        .getElementsByClassName("dropdown-item")[1].className += " active";
      break;
    case "sem3":
      selectedSem = sem3;
      document.getElementById("sem-title").innerText = "Semester 3";
      document.getElementById("sem-syllabus").href = syllabusLink;
      document
        .getElementsByClassName("sem-drop-menu")[0]
        .getElementsByClassName("dropdown-item")[2].className += " active";
      break;
    case "sem4":
      selectedSem = sem4;
      document.getElementById("sem-title").innerText = "Semester 4";
      document.getElementById("sem-syllabus").href = syllabusLink;
      document
        .getElementsByClassName("sem-drop-menu")[0]
        .getElementsByClassName("dropdown-item")[3].className += " active";
      break;
    case "sem5":
      selectedSem = sem5;
      document.getElementById("sem-title").innerText = "Semester 5";
      document.getElementById("sem-syllabus").href = syllabusLink;
      document
        .getElementsByClassName("sem-drop-menu")[0]
        .getElementsByClassName("dropdown-item")[4].className += " active";
      break;
    case "sem6":
      selectedSem = sem6;
      document.getElementById("sem-title").innerText = "Semester 6";
      document.getElementById("sem-syllabus").href = syllabusLink;
      document
        .getElementsByClassName("sem-drop-menu")[0]
        .getElementsByClassName("dropdown-item")[5].className += " active";
      break;
    default:
      selectedSem = sem1;
      document.getElementById("sem-title").innerText = "Semester 1";
      document.getElementById("sem-syllabus").href = syllabusLink;
      document
        .getElementsByClassName("sem-drop-menu")[0]
        .getElementsByClassName("dropdown-item")[0].className += " active";
      break;
  }
}

// Call the function when page loads
updateSemesterContent(sem_id || "sem1");

var notesData = {};
if (course_id == "CHE" && sem_id == "sem1") {
  sem1.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes.html?id=${sub}'>
                ${subName[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "CHE" && sem_id == "sem2") {
  sem2.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes.html?id=${sub}'>
                ${subName2[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

console.log(notesData);
