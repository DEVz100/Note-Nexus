var sem1 = ["BME 101", "BME 102", "BME 103", "BME 104", "BME 105", "BME 106", "BME 107", "BME 108", "BME 109", "BME 110"];
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
var sem2 = ["BME 201", "BME 202", "BME 203", "BME 204", "BME 205", "BME 206", "BME 207", "BME 208", "BME 209", "BME 210"];
var subName2 = [
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
];
var sem3 = ["BME 301", "BME 302", "BME 303", "BME 304", "BME 305", "BME 306", "BME 307", "BME 308", "BME 309"];
var subName3 = [
  "Basic Medical Sciences",
  "Medical Instrumentation",
	"Electronic Circuits",
	"Digital Electronics",
	"Electronic Measurements and Instrumentation",
	"PCB and Prototyping Workshop",
	"Electronic Circuits Lab",
	"Digital Electronics Lab",
  "Servicing Fundamentals Lab"
];
var sem4 = ["BME 401", "BME 402", "BME 403", "BME 404", "BME 405", "BME 406", "BME 407", "BME 408", "BME 409"];
var subName4 = [
  "Linear Integrated Circuits",
  "Microcontroller and Applications",
	"Therapeutic Equipment",
	"Community Skills in Indian knowledge system",
	"Electric Circuits & Networks",
	"Linear Integrated Circuits Lab",
	"Microcontroller and Applications Lab",
	"Medical Electronics Lab 1",
  "Minor Project"
];
var sem5 = ["BME 501", "BME 502", "BME 503", "BME 504", "BME 505", "BME 506", "BME 507", "BME 508", "BME 509"];
var subName5 = [
  "Industrial Management and Safety",
  "Medical Imaging Techniques",
	"Hospital Systems",
	"Embedded Systems/	Analytical Instruments/ Programming in C",
	"Medical Electronics Lab II",
	"Biomedical Instrumentation Lab I",
	"Embedded Systems Lab/ Programming in C Lab",
	"Seminar",
  "Major Project"
];
var sem6 = ["BME 601", "BME 602", "BME 603", "BME 604", "BME 605", "BME 606", "BME 607", "BME 608"];
var subName6 = [
  "Entrepreneurship and Startup",
  "Introduction to 5G/ Advanced Medical Instrumentation and Prosthetics/	Signals and Systems/ Bio MEMS",
	"Healthcare Informatics/ Rehabilitation Engineering/ Biomedical Instrumentation/ IoT in Healthcare",
	"Indian Constitution",
	"Biomedical Instrumentation Lab II	",
	"Computer Hardware and Data Communication Lab",
	"Simulation Lab with Numerical software/ Biomedical Equipment Servicing and Maintenance Lab",
	"Major Project"
];

var selectedSem = [];

let params = new URL(document.location).searchParams;
sem_id = params.get("id");
course_id = params.get("course");
console.log(sem_id);
console.log(course_id);
if (course_id == "CHE") {
  document.getElementById("CourseName").innerText =
    "Computer Hardware Engineering";
  document.getElementById("bmeSems").style.display = "none";
  document.getElementById("semSyllabus").style.display = "none";
} else {
  document.getElementById("cheSems").style.display = "none";
}

switch (sem_id) {
  case "sem1":
    selectedSem = sem1;
    document.getElementById("sem-title").innerText = "Semester 1";
    // document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/1NHEBDX6abXhIr_LQ9_7bxFPUZaANIRQV/view";
    document.getElementById("sem-syllabus").href =
      "https://drive.google.com/file/d/1uyf0GWB8uzNqAvBVlVLla9vznOISvQKK/view?usp=drive_link";
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
if (course_id == "BME" && sem_id == "sem1") {
  sem1.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes3.html?id=${sub}'>
                ${subName[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "BME" && sem_id == "sem2") {
  sem2.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes3.html?id=${sub}'>
                ${subName2[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "BME" && sem_id == "sem3") {
  sem3.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes3.html?id=${sub}'>
                ${subName3[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "BME" && sem_id == "sem4") {
  sem4.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes3.html?id=${sub}'>
                ${subName4[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "BME" && sem_id == "sem5") {
  sem5.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes3.html?id=${sub}'>
                ${subName5[index]}
                </a>`;
    console.log(`${sub}`);
  });
}

var notesData = {};
if (course_id == "BME" && sem_id == "sem6") {
  sem6.forEach(function (sub, index) {
    document.getElementById(
      "subjects-cont"
    ).innerHTML += ` <a class="subject" href='./notes3.html?id=${sub}'>
                ${subName6[index]}
                </a>`;
    console.log(`${sub}`);
  });
}
console.log(notesData);
// else{
//     $.getJSON("./assets/CHE.json", function (data) {

//         notesData = data.CHE
//         selectedSem.forEach(function (sub) {
//             if(notesData[sub]!= null)
//             document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes3.html?id=${sub}'>
//                 ${notesData[sub].SubjectName}
//                 </a>`
//                 console.log(`${sub}`);
//         })
//     }
//     )

// }
