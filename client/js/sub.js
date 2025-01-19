var sem1 = ["CHE 101", "CHE 102", "CHE 103", "CHE 104", "CHE 105", "CHE 106", "CHE 107", "CHE 108", "CHE 109", "CHE 110"];
var subName = [
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
];
var sem2 = ["CHE 201", "CHE 202", "CHE 203", "CHE 204", "CHE 205", "CHE 206", "CHE 207", "CHE 208", "CHE 209", "CHE 210"];
var subName2 = [
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
];
var sem3 = ["CHE 301", "CHE 302", "CHE 303", "CHE 304", "CHE 305", "CHE 306", "CHE 307", "CHE 308", "CHE 309"];
var subName3 = [
  "Computer System Architecture",
  "Programming in C",
  "Computer Networks -I",
  "Digital Computer Fundamentals",	
  "Programming in C Lab",
  "System Administration Lab",
  "Digital Computer Fundamentals Lab",
  "Computer Hardware Lab -I",
  "Application Development Lab"
];
var sem4 = ["CHE 401", "CHE 402", "CHE 403", "CHE 404", "CHE 405", "CHE 406", "CHE 407", "CHE 408", "CHE 409"];
var subName4 = [
  "Object Oriented Programming",
  "Computer Networks II",
  "Embedded System and Real time Operating System",
  "Community Skills in Indian knowledge system",
  "Object Oriented Programming Lab",
  "Network Administration Lab I",
  "Embedded system Lab",
	"Computer Hardware Lab II",
  "Minor Project"
];  
var sem5 = ["CHE 501", "CHE 502", "CHE 503", "CHE 504", "CHE 505", "CHE 506", "CHE 507", "CHE 508", "CHE 509"];
var subName5 = [
  "Project Management and Software Engineering",
  "Internet of Things",
  "Operating System",
  "Virtualisation Technology and Cloud Computing/ Web programming/ Data structures",
  "Internet of Things Lab",
  "Network Administration Lab II",
  "Virtualisation Technology and cloud computing Lab/ Web programming Lab/ Data structures Lab",
  "Seminar",
  "Major Project"
];
var sem6 = ["CHE 601", "CHE 602", "CHE 603", "CHE 604", "CHE 605", "CHE 606", "CHE 607", "CHE 608"];
var subName6 = [
  "Entrepreneurship and Startup",
  "Software Testing/ Introduction to 5G/ Fundamentals of Artificial Intelligence & Machine Learning/ Database Management Systems",
  "Introduction to IoT/	Multimedia/ Cloud Computing/ Computer System Hardware",
  "Indian Constitution",
  "Programming Smart Device Lab",
  "Ethical Hacking Lab",
  "Software Testing Lab/ Fundamentals of Artificial Intelligence & Machine Learning Lab/ Database Management Systems Lab",
  "Major Project"
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

var notesData = {};
if (course_id == "CHE" && sem_id == "sem3") {
  sem3.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes.html?id=${sub}'>
                ${subName3[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "CHE" && sem_id == "sem4") {
  sem4.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes.html?id=${sub}'>
                ${subName4[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "CHE" && sem_id == "sem5") {
  sem5.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes.html?id=${sub}'>
                ${subName5[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "CHE" && sem_id == "sem6") {
  sem6.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes.html?id=${sub}'>
                ${subName6[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

console.log(notesData);
