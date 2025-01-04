
var sem1 = ["BME 101", "BME 103", "BME 105", "BME 107", "BME 109", "CHE1 101","CHE1 102", "CHE1 103", "CHE1 104", "CHE1 105"];
var sem2 = ["BME 102", "BME 104", "BME 106", "BME 108", "BME 110","CHE1 201","CHE1 202", "CHE1 203", "CHE1 204", "CHE2 201"];
var sem3 = ["BME 201", "BME 203", "BME 205", "BME 207", "BME 209","CHE1 301","CHE1 302", "CHE2 302", "CHE2 303", "CHE2 309"];
var sem4 = ["BME 202", "BME 204", "BME 206", "BME 208", "BME 210","CHE1 401"];
var sem5 = ["BME 301", "BME 303", "BME 305", "BME 307", "BME 309", "BME 311", "BME 313", "BME 315"];
var sem6 = ["BME 302", "BME 304", "BME 306", "BME 308", "BME 310", "BME 312", "BME 314", "BME 316"];
var selectedSem = [];

let params = (new URL(document.location)).searchParams;
sem_id = params.get("id");
course_id = params.get("course");
console.log(sem_id);
console.log(course_id);
if (course_id == "CHE") {
    document.getElementById("CourseName").innerText = "Computer Hardware Engineering";
    document.getElementById("bmeSems").style.display="none"; 
    document.getElementById("semSyllabus").style.display="none";  
}
else{
    document.getElementById("cheSems").style.display="none";
}

switch (sem_id) {
    case "sem1":
        selectedSem = sem1;
        document.getElementById("sem-title").innerText = "Semester 1";
        // document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/1NHEBDX6abXhIr_LQ9_7bxFPUZaANIRQV/view";
        document.getElementById("sem-syllabus").href = "https://drive.google.com/file/d/1uyf0GWB8uzNqAvBVlVLla9vznOISvQKK/view?usp=drive_link";
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
if(course_id=="BME"){
    
    $.getJSON("./assets/nom3.json", function (data) {
    
        notesData = data.BME
        selectedSem.forEach(function (sub) {
            
            document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes3.html?id=${sub}'>
                ${notesData[sub].SubjectName}
                </a>`
                console.log(`${sub}`);
        })
    }
    )
}
else{
    $.getJSON("./assets/CHE.json", function (data) {

        notesData = data.CHE
        selectedSem.forEach(function (sub) {
            if(notesData[sub]!= null)
            document.getElementById("subjects-cont").innerHTML += ` <a class="subject" href='./notes3.html?id=${sub}'>
                ${notesData[sub].SubjectName}
                </a>`
                console.log(`${sub}`);
        })
    }
    )
   
}
