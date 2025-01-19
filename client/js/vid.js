// var sem1 = ["CHE 101", "CHE 103", "CHE 105", "CHE 107", "CHE 109", "CE1 101","CE1 102", "CE1 103", "CE1 104", "CE1 105"];
// var sem2 = ["CHE 102", "CHE 104", "CHE 106", "CHE 108", "CHE 110","CE1 201","CE1 202", "CE1 203", "CE1 204", "CE2 201"];
// var sem3 = ["CHE 201", "CHE 203", "CHE 205", "CHE 207", "CHE 209","CE1 301","CE1 302", "CE2 302", "CE2 303", "CE2 309"];
// var sem4 = ["CHE 202", "CHE 204", "CHE 206", "CHE 208", "CHE 210","CE1 401"];
// var sem5 = ["CHE 301", "CHE 303", "CHE 305", "CHE 307", "CHE 309", "CHE 311", "CHE 313", "CHE 315"];
// var sem6 = ["CHE 302", "CHE 304", "CHE 306", "CHE 308", "CHE 310", "CHE 312", "CHE 314", "CHE 316"];

// let params = (new URL(document.location)).searchParams;
// let sub_id = params.get("id");
// let isCE = sub_id.includes("CE");
// if (sub_id === null)
//     sub_id = "CHE 101"
// var selectedSem = [];
// var sly_index = 0;
// var course_code = sub_id.replace("CHE ", "20")


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
// if(!isCE){

//     $.getJSON("./assets/nomtes7.json", function (data) {
    
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
// else{
//     $.getJSON("./assets/CE.json", function (data) {
    
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


