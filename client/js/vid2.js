// var sem1 = ["EL 101", "EL 103", "EL 105", "EL 107", "EL 109", "BME1 101","BME1 102", "BME1 103", "BME1 104", "BME1 105"];
// var sem2 = ["EL 102", "EL 104", "EL 106", "EL 108", "EL 110","BME1 201","BME1 202", "BME1 203", "BME1 204", "BME2 201"];
// var sem3 = ["EL 201", "EL 203", "EL 205", "EL 207", "EL 209","BME1 301","BME1 302", "BME2 302", "BME2 303", "BME2 309"];
// var sem4 = ["EL 202", "EL 204", "EL 206", "EL 208", "EL 210","BME1 401"];
// var sem5 = ["EL 301", "EL 303", "EL 305", "EL 307", "EL 309", "EL 311", "EL 313", "EL 315"];
// var sem6 = ["EL 302", "EL 304", "EL 306", "EL 308", "EL 310", "EL 312", "EL 314", "EL 316"];

// let params = (new URL(document.location)).searchParams;
// let sub_id = params.get("id");
// let isBME = sub_id.includes("BME");
// if (sub_id === null)
//     sub_id = "EL 101"
// var selectedSem = [];
// var sly_index = 0;
// var course_code = sub_id.replace("EL ", "20")


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
// if(!isBME){

//     $.getJSON("./assets/nom2.json", function (data) {
    
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
// else{
//     $.getJSON("./assets/BME.json", function (data) {
    
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


