
var sem1 = ["CE 101", "CE 103", "CE 105", "CE 107", "CE 109", "EL1 101","EL1 102", "EL1 103", "EL1 104", "EL1 105"];
var sem2 = ["CE 102", "CE 104", "CE 106", "CE 108", "CE 110","EL1 201","EL1 202", "EL1 203", "EL1 204", "EL2 201"];
var sem3 = ["CE 201", "CE 203", "CE 205", "CE 207", "CE 209","EL1 301","EL1 302", "EL2 302", "EL2 303", "EL2 309"];
var sem4 = ["CE 202", "CE 204", "CE 206", "CE 208", "CE 210","EL1 401"];
var sem5 = ["CE 301", "CE 303", "CE 305", "CE 307", "CE 309", "CE 311", "CE 313", "CE 315"];
var sem6 = ["CE 302", "CE 304", "CE 306", "CE 308", "CE 310", "CE 312", "CE 314", "CE 316"];
var selectedSem = [];

let params = (new URL(document.location)).searchParams;
sem_id = params.get("id");
course_id = params.get("course");
console.log(sem_id);
console.log(course_id);
if (course_id == "EL") {
    document.getElementById("CourseName").innerText = "Electrical Engineering";
    document.getElementById("ceSems").style.display="none"; 
    document.getElementById("semSyllabus").style.display="none";  
}
else{
    document.getElementById("elSems").style.display="none";
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
if(course_id=="CE"){
    
    $.getJSON("./assets/nom1.json", function (data) {
    
        notesData = data.CE
        selectedSem.forEach(function (sub) {
            
            document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes1.html?id=${sub}'>
                ${notesData[sub].SubjectName}
                </a>`
                console.log(`${sub}`);
        })
    }
    )
}
else{
    $.getJSON("./assets/EL.json", function (data) {

        notesData = data.EL
        selectedSem.forEach(function (sub) {
            if(notesData[sub]!= null)
            document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes1.html?id=${sub}'>
                ${notesData[sub].SubjectName}
                </a>`
                console.log(`${sub}`);
        })
    }
    )
   
}
