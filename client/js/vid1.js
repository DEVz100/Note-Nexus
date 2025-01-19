// var sem1 = ["CE 101", "CE 103", "CE 105", "CE 107", "CE 109", "EL1 101","EL1 102", "EL1 103", "EL1 104", "EL1 105"];
// var sem2 = ["CE 102", "CE 104", "CE 106", "CE 108", "CE 110","EL1 201","EL1 202", "EL1 203", "EL1 204", "EL2 201"];
// var sem3 = ["CE 201", "CE 203", "CE 205", "CE 207", "CE 209","EL1 301","EL1 302", "EL2 302", "EL2 303", "EL2 309"];
// var sem4 = ["CE 202", "CE 204", "CE 206", "CE 208", "CE 210","EL1 401"];
// var sem5 = ["CE 301", "CE 303", "CE 305", "CE 307", "CE 309", "CE 311", "CE 313", "CE 315"];
// var sem6 = ["CE 302", "CE 304", "CE 306", "CE 308", "CE 310", "CE 312", "CE 314", "CE 316"];

// let params = (new URL(document.location)).searchParams;
// let sub_id = params.get("id");
// let isEL = sub_id.includes("EL");
// if (sub_id === null)
//     sub_id = "CE 101"
// var selectedSem = [];
// var sly_index = 0;
// var course_code = sub_id.replace("CE ", "20")


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
// if(!isEL){

//     $.getJSON("./assets/nom1.json", function (data) {
    
//         notesData = data.CE[sub_id]
    
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
//     $.getJSON("./assets/EL.json", function (data) {
    
//         notesData = data.EL[sub_id]
    
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


