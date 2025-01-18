let params = (new URL(document.location)).searchParams;
let sub_id = params.get("id");
console.log(sub_id);

if (sub_id == "CE") {
    document.getElementById("CourseName").innerText = "Computer Hardware Engineering";
   document.getElementById("courseSyllabus").setAttribute("href","https://drive.google.com/file/d/1uyf0GWB8uzNqAvBVlVLla9vznOISvQKK/view?usp=drive_link");
    document.getElementById("Year-3").style.display="none";
    document.getElementById("cheSems").style.display="none";   
}
else{
    document.getElementById("ceSems").style.display="none";
}

// function zoomsite() {
//     window.open("https://zoomquilt.org/");
// }