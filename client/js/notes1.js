var sem1 = ["CE 101", "CE 103", "CE 105", "CE 107", "CE 109", "EL1 101","EL1 102", "EL1 103", "EL1 104", "EL1 105"];
var sem2 = ["CE 102", "CE 104", "CE 106", "CE 108", "CE 110","EL1 201","EL1 202", "EL1 203", "EL1 204", "EL2 201"];
var sem3 = ["CE 201", "CE 203", "CE 205", "CE 207", "CE 209","EL1 301","EL1 302", "EL2 302", "EL2 303", "EL2 309"];
var sem4 = ["CE 202", "CE 204", "CE 206", "CE 208", "CE 210","EL1 401"];
var sem5 = ["CE 301", "CE 303", "CE 305", "CE 307", "CE 309", "CE 311", "CE 313", "CE 315"];
var sem6 = ["CE 302", "CE 304", "CE 306", "CE 308", "CE 310", "CE 312", "CE 314", "CE 316"];

let params = (new URL(document.location)).searchParams;
let sub_id = params.get("id");
let isEL = sub_id.includes("EL");

if (sub_id === null)
    sub_id = "CE 101"
var selectedSem = [];
var sly_index = 0;
if(!isEL){
    var course_code = sub_id.replace("CE ", "20");
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

if(!isEL){
    $.getJSON("./assets/nom1.json", function (data) {
    
        selectedSem.forEach(el => {
    
            if (el === sub_id) {
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item active" href="./notes1.html?id=${el}">
            
                ${data.CE[el]["SubjectName"]}
                </a>`
            }
            else {
                if(data.CE[el] != null)
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item" href="./notes1.html?id=${el}">
                
                ${data.CE[el]["SubjectName"]}
                </a>`
            }
        })    
            notesData = data.CE[sub_id];
            getData();
    
    })
}
else{
    document.getElementById("courseName").innerText = "Computer Engineering";
    document.getElementById("sem-title").setAttribute("href","./semester1.html?id=EL")
    $.getJSON("./assets/EL.json", function (data) {
    
        selectedSem.forEach(el => {
    
            if (el === sub_id) {
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item active" href="./notes1.html?id=${el}">
            
                ${data.EL[el]["SubjectName"]}
                </a>`
            }
            else {
                if(data.EL[el] != null)
                document.getElementById("sub-drop-cont").innerHTML += ` <a class="dropdown-item" href="./notes1.html?id=${el}">
                
                ${data.EL[el]["SubjectName"]}
                </a>`
            }
        })    
            notesData = data.EL[sub_id];
            getData();
    
    })
    
}

let SylLink = "./assets/ELsyll.json";

if(!isEL ){
    SylLink = "./assets/course1.json";
    // SylLink = "https://raw.githubusercontent.com/Xbotics7/bruh/main/course.json";
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
    window.open(location.href = 'vid1.html?id=' + sub_id);
}


