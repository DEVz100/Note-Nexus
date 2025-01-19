var sem1 = ["EL 101", "EL 102", "EL 103", "EL 104", "EL 105", "EL 106", "EL 107", "EL 108", "EL 109", "EL 110"];
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
var sem2 = ["EL 201", "EL 202", "EL 203", "EL 204", "EL 205", "EL 206", "EL 207", "EL 208", "EL 209", "EL 210"];
var subName2 = [
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
];
var sem3 = ["EL 301", "EL 302", "EL 303", "EL 304", "EL 305", "EL 306", "EL 307", "EL 308", "EL 309"];
var subName3 = [
  "Analog & Digital Circuits",
  "DC Machines & Traction Motors",
	"Fundamentals of Electric Circuits",
	"Electrical & Electronics Measuring Instruments",
	"Mechanical Engineering",
	"DC Machines Lab",
	"Electrical Measurements Lab",
	"Electrical Workshop Practice",
  "	Mechanical Engineering Lab"
];
var sem4 = ["EL 401", "EL 402", "EL 403", "EL 404", "EL 405", "EL 406", "EL 407", "EL 408", "EL 409"];
var subName4 = [
  "Power Electronics Devices and Circuits",
  "Electrical Installation Design & Estimation",
	"Induction Machines",
	"Community Skills in Indian knowledge system",
	"Electronics Lab",
	"Induction Machines Lab",
	"Domestic Appliances Repair & Maintenance Workshop",
	"Professional Practice Lab",
  "Minor Project"
];
var sem5 = ["EL 501", "EL 502", "EL 503", "EL 504", "EL 505", "EL 506", "EL 507", "EL 508", "EL 509"];
var subName5 = [
  "Industrial Management and Safety",
  "Synchronous Machines & FHP Motors",
	"Electricity Generation, Transmission & Distribution",
	"Renewable Energy Power Plant/ Industrial Drives & Control/ Switch Gear & Protection",
	"Synchronous Machines Lab",
	"Industrial Electrical Engineering Lab",
	"Electrical Estimation Lab/ Applied Electronics Lab/ Solar Energy Technology Lab",
	"Seminar",
  "Major Project"
];
var sem6 = ["EL 601", "EL 602", "EL 603", "EL 604", "EL 605", "EL 606", "EL 607", "EL 608"];
var subName6 = [
  "Entrepreneurship and Startup",
  "Energy Conservation & Audit (EE)/	Microcontroller & PLC/	Electric Vehicles",
	"Solar Power Technologies/Energy Conservation & Management/	Electrification of Residential Buildings/ Electric Vehicles & Traction",
	"Indian Constitution",
	"Electrical Computer Aided Drafting Lab",
	"Industrial Automation Lab",
	"Applied Electrical Testing Lab/ Modelling and simulation Lab/ Advanced Solar Photovoltaic Lab",
	"Major Project"
];

var selectedSem = [];

let params = new URL(document.location).searchParams;
sem_id = params.get("id");
course_id = params.get("course");
console.log(sem_id);
console.log(course_id);
if (course_id == "BME") {
  document.getElementById("CourseName").innerText = "Bio Medical Engineering";
  document.getElementById("elSems").style.display = "none";
  document.getElementById("semSyllabus").style.display = "none";
} else {
  document.getElementById("bmeSems").style.display = "none";
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
if (course_id == "EL" && sem_id == "sem1") {
  sem1.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes2.html?id=${sub}'>
                ${subName[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "EL" && sem_id == "sem2") {
  sem2.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes2.html?id=${sub}'>
                ${subName2[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "EL" && sem_id == "sem3") {
  sem3.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes2.html?id=${sub}'>
                ${subName3[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "EL" && sem_id == "sem4") {
  sem4.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes2.html?id=${sub}'>
                ${subName4[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "EL" && sem_id == "sem5") {
  sem5.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes2.html?id=${sub}'>
                ${subName5[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "EL" && sem_id == "sem6") {
  sem6.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes2.html?id=${sub}'>
                ${subName6[index]}
                </a>`;
    console.log(`${sub}`);
  });
}
console.log(notesData);

// else{
//     $.getJSON("./assets/BME.json", function (data) {

//         notesData = data.BME
//         selectedSem.forEach(function (sub) {
//             if(notesData[sub]!= null)
//             document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes2.html?id=${sub}'>
//                 ${notesData[sub].SubjectName}
//                 </a>`
//                 console.log(`${sub}`);
//         })
//     }
//     )

// }
