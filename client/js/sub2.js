
var sem1 = ["EL 101", "EL 103", "EL 105", "EL 107", "EL 109", "BME1 101","BME1 102", "BME1 103", "BME1 104", "BME1 105"];
var sem2 = ["EL 102", "EL 104", "EL 106", "EL 108", "EL 110","BME1 201","BME1 202", "BME1 203", "BME1 204", "BME2 201"];
var sem3 = ["EL 201", "EL 203", "EL 205", "EL 207", "EL 209","BME1 301","BME1 302", "BME2 302", "BME2 303", "BME2 309"];
var sem4 = ["EL 202", "EL 204", "EL 206", "EL 208", "EL 210","BME1 401"];
var sem5 = ["EL 301", "EL 303", "EL 305", "EL 307", "EL 309", "EL 311", "EL 313", "EL 315"];
var sem6 = ["EL 302", "EL 304", "EL 306", "EL 308", "EL 310", "EL 312", "EL 314", "EL 316"];
var selectedSem = [];

let params = (new URL(document.location)).searchParams;
sem_id = params.get("id");
course_id = params.get("course");
console.log(sem_id);
console.log(course_id);
if (course_id == "BME") {
    document.getElementById("CourseName").innerText = "Bio Medical Engineering";
    document.getElementById("elSems").style.display="none"; 
    document.getElementById("semSyllabus").style.display="none";  
}
else{
    document.getElementById("bmeSems").style.display="none";
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
if(course_id=="EL"){
    
    $.getJSON("./assets/nom2.json", function (data) {
    
        notesData = data.EL
        selectedSem.forEach(function (sub) {
            
            document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes2.html?id=${sub}'>
                ${notesData[sub].SubjectName}
                </a>`
                console.log(`${sub}`);
        })
    }
    )
}
else{
    $.getJSON("./assets/BME.json", function (data) {

        notesData = data.BME
        selectedSem.forEach(function (sub) {
            if(notesData[sub]!= null)
            document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes2.html?id=${sub}'>
                ${notesData[sub].SubjectName}
                </a>`
                console.log(`${sub}`);
        })
    }
    )
   
}
