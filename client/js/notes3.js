var sem1 = ["BME 101", "BME 103", "BME 105", "BME 107", "BME 109", "CHE1 101","CHE1 102", "CHE1 103", "CHE1 104", "CHE1 105"];
var sem2 = ["BME 102", "BME 104", "BME 106", "BME 108", "BME 110","CHE1 201","CHE1 202", "CHE1 203", "CHE1 204", "CHE2 201"];
var sem3 = ["BME 201", "BME 203", "BME 205", "BME 207", "BME 209","CHE1 301","CHE1 302", "CHE2 302", "CHE2 303", "CHE2 309"];
var sem4 = ["BME 202", "BME 204", "BME 206", "BME 208", "BME 210","CHE1 401"];
var sem5 = ["BME 301", "BME 303", "BME 305", "BME 307", "BME 309", "BME 311", "BME 313", "BME 315"];
var sem6 = ["BME 302", "BME 304", "BME 306", "BME 308", "BME 310", "BME 312", "BME 314", "BME 316"];

let params = (new URL(document.location)).searchParams;
let sub_id = params.get("id");
let isCHE = sub_id.includes("CHE");

if (sub_id === null)
    sub_id = "BME 101"
var selectedSem = [];
var sly_index = 0;
if(!isCHE){
    var course_code = sub_id.replace("BME ", "20");
}
else{
    var course_code = sub_id;
}
document.getElementById("sub-code").innerText = sub_id;

if (sem1.includes(sub_id)) {
    document.getElementById("sem-title").innerText = "Semester 1";
    selectedSem = sem1;
    sly_index = 0;
}
else if (sem2.includes(sub_id)) {
    document.getElementById("sem-title").innerText = "Semester 2";
    selectedSem = sem2;
    sly_index = 1;
}
else if (sem3.includes(sub_id)) {
    document.getElementById("sem-title").innerText = "Semester 3";
    selectedSem = sem3;
    sly_index = 2;
}
else if (sem4.includes(sub_id)) {
    document.getElementById("sem-title").innerText = "Semester 4";
    selectedSem = sem4;
    sly_index = 3;
}
else if (sem5.includes(sub_id)) {
    document.getElementById("sem-title").innerText = "Semester 5";
    selectedSem = sem5;
    sly_index = 4;
}
else if (sem6.includes(sub_id)) {
    document.getElementById("sem-title").innerText = "Semester 6";
    selectedSem = sem6;
    sly_index = 5;
}
else {
    document.getElementById("sem-title").innerText = "Semester 1";
    selectedSem = sem1;
    sly_index = 0;
}



var notesData = {};
var notes_collec;
var notes_collec_object;

function getData(){
    document.getElementById("notes-cont").innerHTML += ` <a class="notesBtn" id="notesPop" onclick="openNotes()" href="#">
        <i class="fa fa-sticky-note fa-lg mr-2"></i>
        Notes
        </a>`
    
        if (notesData["Akash_url"] !== "") {
            document.getElementById("notes-cont").innerHTML += ` <a class="notesBtn" href='${notesData["Akash_url"]}' target="_blank">
            <i class="fa fa-bookmark fa-lg mr-2"></i>
            PYQs
            </a>`
        }
        if (notesData["Book_url"] !== "") {
            document.getElementById("notes-cont").innerHTML += ` <a class="notesBtn" href='${notesData["Book_url"]}' target="_blank">
            <i class="fa fa-book fa-lg mr-2"></i>
            Book
            </a>`
        }
        if (notesData["Paper_analysis_url"] !== "") {
            document.getElementById("notes-cont").innerHTML += ` <a class="notesBtn" href='${notesData["Paper_analysis_url"]}' target="_blank">
            <i class="fa fa-file-text-o fa-lg mr-2"></i>
            Paper Analysis
            </a>`
        }
        document.getElementById("notes-cont").innerHTML += ` <a class="notesBtn" onclick="openVideos()" href="#">
        <i class="fa fa-video-camera fa-lg mr-2"></i>
        Videos
        </a>`
    
        var res = notesData["SubjectName"].substr(0, 15);
        if (notesData["SubjectName"].length > 15)
            res = res + "..."
        document.getElementById("sub-title").innerText = res;
        notes_collec = notesData["Notes"]
        notes_collec_object = Object.keys(notes_collec);
}

if(!isCHE){
    $.getJSON("./assets/nom3.json", function (data) {
    
        selectedSem.forEach(el => {
    
            if (el === sub_id) {
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item active" href="./notes3.html?id=${el}">
            
                ${data.BME[el]["SubjectName"]}
                </a>`
            }
            else {
                if(data.BME[el] != null)
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item" href="./notes3.html?id=${el}">
                
                ${data.BME[el]["SubjectName"]}
                </a>`
            }
        })    
            notesData = data.BME[sub_id];
            getData();
    
    })
}
else{
    document.getElementById("courseName").innerText = "Computer Hardware Engineering";
    document.getElementById("sem-title").setAttribute("href","./semester3.html?id=CHE")
    $.getJSON("./assets/CHE.json", function (data) {
    
        selectedSem.forEach(el => {
    
            if (el === sub_id) {
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item active" href="./notes3.html?id=${el}">
            
                ${data.CHE[el]["SubjectName"]}
                </a>`
            }
            else {
                if(data.CHE[el] != null)
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item" href="./notes3.html?id=${el}">
                
                ${data.CHE[el]["SubjectName"]}
                </a>`
            }
        })    
            notesData = data.CHE[sub_id];
            getData();
    
    })
    
}

let SylLink = "./assets/CHEsyll.json";

if(!isCHE ){
    SylLink = "./assets/course3.json";
}
$.getJSON(SylLink, function (data) {
    var semsly = data[0]["semester"][sly_index]

    var semsly_obj = Object.keys(semsly["subjects"]);

    for (i = 0; i < semsly_obj.length; i++) {

        var bruh = semsly["subjects"][semsly_obj[i]];

        var notes = Object.keys(bruh);

        var sly = bruh["syllabus"]

        var sly_obj = Object.keys(sly);

        if (bruh["paper_id"].toString() === course_code) {

            for (j = 0; j < sly_obj.length; j++) {

                var slynew = sly[sly_obj[j]];

                var title = slynew["title"]

                var chap = slynew["chapters"]

                document.getElementById("course-sly").innerHTML += ` <div class="sly-cont">
                <h2 class="sly-unit">
                    ${sly_obj[j].replace("_", "-")}
                </h2>
                <h3 class="sly-title">
                    ${title}
                </h3>
                <p class="sly-chap">
                    ${chap}
                </p>
            </div>`
            }
            return;
        }

    }
})

function openNotes() {

    if (notes_collec_object.length <= 1) {
        if (notes_collec[notes_collec_object[0]] !== "")
            window.open(notes_collec[notes_collec_object[0]]);
        else {
            $('.toast').toast('show')
        }
    }
    else {
        $('#notesModalCenter').modal({
            keyboard: false
        })
        document.getElementById("notes-pop-body").innerHTML = "";
        for (i = 0; i < notes_collec_object.length; i++) {
            document.getElementById("notes-pop-body").innerHTML += `<a class="notesPopBtn" href='${notes_collec[notes_collec_object[i]]}' target="_blank">
            <i class="fa fa-sticky-note fa-lg mr-2"></i>
            ${notes_collec_object[i]}
            </a>`
        }
    }

}

function openVideos() {
    window.open(location.href = 'vid3.html?id=' + sub_id);
}


