
var sem1 = ["CHE 101", "CHE 103", "CHE 105", "CHE 107", "CHE 109", "CE1 101","CE1 102", "CE1 103", "CE1 104", "CE1 105"];
var sem2 = ["CHE 102", "CHE 104", "CHE 106", "CHE 108", "CHE 110","CE1 201","CE1 202", "CE1 203", "CE1 204", "CE2 201"];
var sem3 = ["CHE 201", "CHE 203", "CHE 205", "CHE 207", "CHE 209","CE1 301","CE1 302", "CE2 302", "CE2 303", "CE2 309"];
var sem4 = ["CHE 202", "CHE 204", "CHE 206", "CHE 208", "CHE 210","CE1 401"];
var sem5 = ["CHE 301", "CHE 303", "CHE 305", "CHE 307", "CHE 309", "CHE 311", "CHE 313", "CHE 315"];
var sem6 = ["CHE 302", "CHE 304", "CHE 306", "CHE 308", "CHE 310", "CHE 312", "CHE 314", "CHE 316"];
var selectedSem = [];

let params = (new URL(document.location)).searchParams;
sem_id = params.get("id");
course_id = params.get("course");
console.log(sem_id);
console.log(course_id);
if (course_id == "CE") {
    document.getElementById("CourseName").innerText = "Computer Engineering";
    document.getElementById("cheSems").style.display="none"; 
    document.getElementById("semSyllabus").style.display="none";  
}
else{
    document.getElementById("ceSems").style.display="none";
}

switch (sem_id) {
    case "sem1":
        selectedSem = sem1;
        document.getElementById("sem-title").innerText = "Semester 1";
        document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/1NHEBDX6abXhIr_LQ9_7bxFPUZaANIRQV/view";
        document.getElementsByClassName("sem-drop-menu")[0].getElementsByClassName("dropdown-item")[0].className += " active";
        break;
    case "sem2":
        selectedSem = sem2;
        document.getElementById("sem-title").innerText = "Semester 2";
        document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/1z_806K8prZ1XkiHzHJDN1h78YwIflwHt/view";
        document.getElementsByClassName("sem-drop-menu")[0].getElementsByClassName("dropdown-item")[1].className += " active";
        break;
    case "sem3":
        selectedSem = sem3;
        document.getElementById("sem-title").innerText = "Semester 3";
        document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/18Ztc2JiHaPN08dQOLFaCEjebiKSLEorw/view";
        document.getElementsByClassName("sem-drop-menu")[0].getElementsByClassName("dropdown-item")[2].className += " active";
        break;
    case "sem4":
        selectedSem = sem4;
        document.getElementById("sem-title").innerText = "Semester 4";
        document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/13z2ldJHVl6OgvuBfNmJ4qEUcJaYVuLzF/view";
        document.getElementsByClassName("sem-drop-menu")[0].getElementsByClassName("dropdown-item")[3].className += " active";
        break;
    case "sem5":
        selectedSem = sem5;
        document.getElementById("sem-title").innerText = "Semester 5";
        document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/1eTM8sC2TeZkhZbpgdGfqUtVokICH3yeA/view";
        document.getElementsByClassName("sem-drop-menu")[0].getElementsByClassName("dropdown-item")[4].className += " active";
        break;
    case "sem6":
        selectedSem = sem6;
        document.getElementById("sem-title").innerText = "Semester 6";
        document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/1ncmOwCpqmfWrRL2UTg_C5gN7cWB2HJOv/view";
        document.getElementsByClassName("sem-drop-menu")[0].getElementsByClassName("dropdown-item")[5].className += " active";
        break;
    default:
        selectedSem = sem1;
        document.getElementById("sem-title").innerText = "Semester 1";
        document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/1NHEBDX6abXhIr_LQ9_7bxFPUZaANIRQV/view";
        document.getElementsByClassName("sem-drop-menu")[0].getElementsByClassName("dropdown-item")[0].className += " active";
        break;
}


var notesData = {};
if(course_id=="CHE"){
    
    $.getJSON("./assets/nomtes7.json", function (data) {
    
        notesData = data.CHE
        selectedSem.forEach(function (sub) {
            
            document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes.html?id=${sub}'>
                ${notesData[sub].SubjectName}
                </a>`
                console.log(`${sub}`);
        })
    }
    )
}
else{
    $.getJSON("./assets/CE.json", function (data) {

        notesData = data.CE
        selectedSem.forEach(function (sub) {
            if(notesData[sub]!= null)
            document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes.html?id=${sub}'>
                ${notesData[sub].SubjectName}
                </a>`
                console.log(`${sub}`);
        })
    }
    )
   
}
