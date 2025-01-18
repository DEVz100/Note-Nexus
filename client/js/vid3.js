// var sem1 = ["BME 101", "BME 103", "BME 105", "BME 107", "BME 109", "CHE1 101","CHE1 102", "CHE1 103", "CHE1 104", "CHE1 105"];
// var sem2 = ["BME 102", "BME 104", "BME 106", "BME 108", "BME 110","CHE1 201","CHE1 202", "CHE1 203", "CHE1 204", "CHE2 201"];
// var sem3 = ["BME 201", "BME 203", "BME 205", "BME 207", "BME 209","CHE1 301","CHE1 302", "CHE2 302", "CHE2 303", "CHE2 309"];
// var sem4 = ["BME 202", "BME 204", "BME 206", "BME 208", "BME 210","CHE1 401"];
// var sem5 = ["BME 301", "BME 303", "BME 305", "BME 307", "BME 309", "BME 311", "BME 313", "BME 315"];
// var sem6 = ["BME 302", "BME 304", "BME 306", "BME 308", "BME 310", "BME 312", "BME 314", "BME 316"];

// let params = (new URL(document.location)).searchParams;
// let sub_id = params.get("id");
// let isCHE = sub_id.includes("CHE");
// if (sub_id === null)
//     sub_id = "BME 101"
// var selectedSem = [];
// var sly_index = 0;
// var course_code = sub_id.replace("BME ", "20")


// if (sem1.includes(sub_id)) {
//     selectedSem = sem1;
//     sly_index = 0;
// }
// else if (sem2.includes(sub_id)) {
//     selectedSem = sem2;
//     sly_index = 1;
// }
// else if (sem3.includes(sub_id)) {
//     selectedSem = sem3;
//     sly_index = 2;
// }
// else if (sem4.includes(sub_id)) {
//     selectedSem = sem4;
//     sly_index = 3;
// }
// else if (sem5.includes(sub_id)) {
//     selectedSem = sem5;
//     sly_index = 4;
// }
// else if (sem6.includes(sub_id)) {
//     selectedSem = sem6;
//     sly_index = 5;
// }
// else {
//     selectedSem = sem1;
//     sly_index = 0;
// }



// var notesData = {};
// var vid_collec;
// var vid_collec_object;
// if(!isCHE){

//     $.getJSON("./assets/nom3.json", function (data) {
    
//         notesData = data.BME[sub_id]
    
//         vid_collec = notesData["Youtube"]
//         if (vid_collec !== null && vid_collec !== undefined) {
//             vid_collec_object = Object.keys(vid_collec);
//             getVids()
//         }
//         else
//             $(".not-available").removeClass("d-none").addClass("d-flex")
    
    
//     })
// }
// else{
//     $.getJSON("./assets/CHE.json", function (data) {
    
//         notesData = data.CHE[sub_id]
    
//         vid_collec = notesData["Youtube"]
//         if (vid_collec !== null && vid_collec !== undefined) {
//             vid_collec_object = Object.keys(vid_collec);
//             getVids()
//         }
//         else
//             $(".not-available").removeClass("d-none").addClass("d-flex")
    
    
//     })

// }



// function getVids() {
//     document.getElementById("vid-list-cont").innerHTML = "";

//     if (vid_collec_object.length <= 0) {
//         $(".not-available").removeClass("d-none").addClass("d-flex")
//     } else {
//         $(".not-available").removeClass("d-flex").addClass("d-none")
//     }

//     for (i = 0; i < vid_collec_object.length; i++) {
//         document.getElementById("vid-list-cont").innerHTML += `<a class="vidBtn" href='#' onclick='openVid("${vid_collec[vid_collec_object[i]]}", "${vid_collec_object[i]}")'>
//             <i class="fa fa-vid fa-lg mr-2"></i>
//             ${vid_collec_object[i]}
//             </a>`
//     }
// }

// function youtube_playlist_parser(url) {

//     var reg = new RegExp("[&?]list=([a-z0-9_]+)", "i");
//     var match = reg.exec(url);

//     if (match && match[1].length > 0) {
//         return match[1];
//     } else {
//         return "";
//     }

// }

// function openVid(vid_url, title, obj) {

//     document.getElementById("vid-title").innerText = title;

//     document.getElementById("vid-frame").innerHTML = `
//     <iframe width="100%" height="415" src="https://www.youtube.com/embed/videoseries?list=${youtube_playlist_parser(vid_url)}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

//     return false;
// }


