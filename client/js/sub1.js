var sem1 = ["CE 101", "CE 102", "CE 103", "CE 104", "CE 105", "CE 106", "CE 107", "CE 108", "CE 109", "CE 110"];
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
var sem2 = ["CE 201", "CE 202", "CE 203", "CE 204", "CE 205", "CE 206", "CE 207", "CE 208", "CE 209", "CE 210"];
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
var sem3 = ["CE 301", "CE 302", "CE 303", "CE 304", "CE 305", "CE 306", "CE 307", "CE 308", "CE 309"];
var subName3 = [
  "Computer Organisation",
  "Programming in C",
	"Database Management Systems",
	"Digital Computer Fundamentals",
	"Programming in C Lab",
	"Database Management System lab",
	"Digital Computer Fundamentals Lab",
	"Web Technology lab",
  "Computer System Hardware Lab"
];
var sem4 = ["CE 401", "CE 402", "CE 403", "CE 404", "CE 405", "CE 406", "CE 407", "CE 408", "CE 409"];
var subName4 = [
  "Object Oriented Programming",
  "Computer Communication and Networks",
	"Data Structures",
  "Community Skills in Indian knowledge system",
	"Object Oriented Programming Lab",
 	"Web Programming Lab",
 	"Data Structures Lab",
 	"Application Development Lab",
 	"Minor Project"
];
var sem5 = ["CE 501", "CE 502", "CE 503", "CE 504", "CE 505", "CE 506", "CE 507", "CE 508", "CE 509"];
var subName5 = [
  "Project Management and Software Engineering",
  "Embedded System and Real time Operating System",
	"Operating System",
 	"Virtualisation Technology and Cloud Computing/ Ethical Hacking/ Fundamentals of Artificial Intelligence and Machine Learning",
 	"Embedded Systems and Real Time Operating System Lab",
 	"System Administration Lab",
 	"Virtualisation Technology and cloud computing Lab/ Ethical Hacking Lab/ Fundamentals of Artificial Intelligence and Machine Learning Lab",
 	"Seminar",
 	"Major Project"
];
var sem6 = ["CE 601", "CE 602", "CE 603", "CE 604", "CE 605", "CE 606", "CE 607", "CE 608"];
var subName6 = [
  "Entrepreneurship and Startup",
	"Internet of Things",
	"Server Administration/ Software Testing/ Introduction to 5G",
	"Introduction to IoT/ Fundamentals of Web Technology/ Multimedia/ Cloud Computing",
	"Indian Constitution",
	"Computer Network Engineering Lab",
	"Smart Device Programming Lab",
	"Internet of Things Lab/ Server Administration Lab/ Software Testing Lab"	,
	"Major Project"
];

var selectedSem = [];

let params = new URL(document.location).searchParams;
sem_id = params.get("id");
course_id = params.get("course");
console.log(sem_id);
console.log(course_id);
if (course_id == "EL") {
  document.getElementById("CourseName").innerText = "Electrical Engineering";
  document.getElementById("ceSems").style.display = "none";
  document.getElementById("semSyllabus").style.display = "none";
} else {
  document.getElementById("elSems").style.display = "none";
}

switch (sem_id) {
  case "sem1":
    selectedSem = sem1;
    document.getElementById("sem-title").innerText = "Semester 1";
    document.getElementById("sem-syllabus").href =
      "https://drive.google.com/file/d/1NHEBDX6abXhIr_LQ9_7bxFPUZaANIRQV/view";
    document
      .getElementsByClassName("sem-drop-menu")[0]
      .getElementsByClassName("dropdown-item")[0].className += " active";
    break;
  case "sem2":
    selectedSem = sem2;
    document.getElementById("sem-title").innerText = "Semester 2";
    document.getElementById("sem-syllabus").href =
      "https://drive.google.com/file/d/1z_806K8prZ1XkiHzHJDN1h78YwIflwHt/view";
    document
      .getElementsByClassName("sem-drop-menu")[0]
      .getElementsByClassName("dropdown-item")[1].className += " active";
    break;
  case "sem3":
    selectedSem = sem3;
    document.getElementById("sem-title").innerText = "Semester 3";
    document.getElementById("sem-syllabus").href =
      "https://drive.google.com/file/d/18Ztc2JiHaPN08dQOLFaCEjebiKSLEorw/view";
    document
      .getElementsByClassName("sem-drop-menu")[0]
      .getElementsByClassName("dropdown-item")[2].className += " active";
    break;
  case "sem4":
    selectedSem = sem4;
    document.getElementById("sem-title").innerText = "Semester 4";
    document.getElementById("sem-syllabus").href =
      "https://drive.google.com/file/d/13z2ldJHVl6OgvuBfNmJ4qEUcJaYVuLzF/view";
    document
      .getElementsByClassName("sem-drop-menu")[0]
      .getElementsByClassName("dropdown-item")[3].className += " active";
    break;
  case "sem5":
    selectedSem = sem5;
    document.getElementById("sem-title").innerText = "Semester 5";
    document.getElementById("sem-syllabus").href =
      "https://drive.google.com/file/d/1eTM8sC2TeZkhZbpgdGfqUtVokICH3yeA/view";
    document
      .getElementsByClassName("sem-drop-menu")[0]
      .getElementsByClassName("dropdown-item")[4].className += " active";
    break;
  case "sem6":
    selectedSem = sem6;
    document.getElementById("sem-title").innerText = "Semester 6";
    document.getElementById("sem-syllabus").href =
      "https://drive.google.com/file/d/1ncmOwCpqmfWrRL2UTg_C5gN7cWB2HJOv/view";
    document
      .getElementsByClassName("sem-drop-menu")[0]
      .getElementsByClassName("dropdown-item")[5].className += " active";
    break;
  default:
    selectedSem = sem1;
    document.getElementById("sem-title").innerText = "Semester 1";
    document.getElementById("sem-syllabus").href =
      "https://drive.google.com/file/d/1NHEBDX6abXhIr_LQ9_7bxFPUZaANIRQV/view";
    document
      .getElementsByClassName("sem-drop-menu")[0]
      .getElementsByClassName("dropdown-item")[0].className += " active";
    break;
}

var notesData = {};
if (course_id == "CE" && sem_id == "sem1") {
  sem1.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes1.html?id=${sub}'>
                ${subName[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "CE" && sem_id == "sem2") {
  sem2.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes1.html?id=${sub}'>
                ${subName2[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "CE" && sem_id == "sem3") {
  sem3.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes1.html?id=${sub}'>
                ${subName3[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "CE" && sem_id == "sem4") {
  sem4.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes1.html?id=${sub}'>
                ${subName4[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "CE" && sem_id == "sem5") {
  sem5.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes1.html?id=${sub}'>
                ${subName5[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "CE" && sem_id == "sem6") {
  sem6.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes1.html?id=${sub}'>
                ${subName6[index]}
                </a>`;
    console.log(`${sub}`);
  });
}
console.log(notesData);

// else{
//     $.getJSON("./assets/EL.json", function (data) {

//         notesData = data.EL
//         selectedSem.forEach(function (sub) {
//             if(notesData[sub]!= null)
//             document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes1.html?id=${sub}'>
//                 ${notesData[sub].SubjectName}
//                 </a>`
//                 console.log(`${sub}`);
//         })
//     }
//     )

// }
