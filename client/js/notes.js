var sem1 = ["CHE 101", "CHE 103", "CHE 105", "CHE 107", "CHE 109", "CE1 101","CE1 102", "CE1 103", "CE1 104", "CE1 105"];
var sem2 = ["CHE 102", "CHE 104", "CHE 106", "CHE 108", "CHE 110","CE1 201","CE1 202", "CE1 203", "CE1 204", "CE2 201"];
var sem3 = ["CHE 201", "CHE 203", "CHE 205", "CHE 207", "CHE 209","CE1 301","CE1 302", "CE2 302", "CE2 303", "CE2 309"];
var sem4 = ["CHE 202", "CHE 204", "CHE 206", "CHE 208", "CHE 210","CE1 401"];
var sem5 = ["CHE 301", "CHE 303", "CHE 305", "CHE 307", "CHE 309", "CHE 311", "CHE 313", "CHE 315"];
var sem6 = ["CHE 302", "CHE 304", "CHE 306", "CHE 308", "CHE 310", "CHE 312", "CHE 314", "CHE 316"];

let params = (new URL(document.location)).searchParams;
let sub_id = params.get("id");
let isCE = sub_id.includes("CE");

if (sub_id === null)
    sub_id = "CHE 101"
var selectedSem = [];
var sly_index = 0;
if(!isCE){
    var course_code = sub_id.replace("CHE ", "20");
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

if(!isCE){
    $.getJSON("./assets/nomtes7.json", function (data) {
    
        selectedSem.forEach(el => {
    
            if (el === sub_id) {
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item active" href="./notes.html?id=${el}">
            
                ${data.CHE[el]["SubjectName"]}
                </a>`
            }
            else {
                if(data.CHE[el] != null)
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item" href="./notes.html?id=${el}">
                
                ${data.CHE[el]["SubjectName"]}
                </a>`
            }
        })    
            notesData = data.CHE[sub_id];
            getData();
    
    })
}
else{
    document.getElementById("courseName").innerText = "Computer Hardware Engineering";
    document.getElementById("sem-title").setAttribute("href","./semester.html?id=CE")
    $.getJSON("./assets/CE.json", function (data) {
    
        selectedSem.forEach(el => {
    
            if (el === sub_id) {
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item active" href="./notes.html?id=${el}">
            
                ${data.CE[el]["SubjectName"]}
                </a>`
            }
            else {
                if(data.CE[el] != null)
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item" href="./notes.html?id=${el}">
                
                ${data.CE[el]["SubjectName"]}
                </a>`
            }
        })    
            notesData = data.CE[sub_id];
            getData();
    
    })
    
}

let SylLink = "./assets/CEsyll.json";

if(!isCE ){
    SylLink = "./assets/course.json";
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
    window.open(location.href = 'vid.html?id=' + sub_id);
}


