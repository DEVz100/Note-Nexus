var currentTheme = "";
$(document).ready(function () {
  getPageTheme();
  setPageTheme(currentTheme);
});

function getPageTheme() {
  if (localStorage.getItem("theme") !== null) {
    currentTheme = localStorage.getItem("theme");
  } else {
    localStorage.setItem("theme", "light");
    currentTheme = "light";
  }
}

function setPageTheme(theme) {
  if (theme === "light") {
    $(".theme-icon").removeClass("bi-sun").addClass("bi-moon");
  } else if (theme === "dark") {
    $(".theme-icon").removeClass("bi-moon").addClass("bi-sunrise");
  } else if (theme === "orange") {
    $(".theme-icon").removeClass("bi-sunrise").addClass("bi-cloud-sun");
  } else if (theme === "purple") {
    $(".theme-icon")
      .removeClass("bi-cloud-sun")
      .addClass("bi-brightness-alt-low");
  } else if (theme === "red") {
    $(".theme-icon")
      .removeClass("bi-brightness-alt-low")
      .addClass("bi-moon-stars");
  } else {
    $(".theme-icon").removeClass("bi-moon-stars").addClass("bi-sun");
  }

  $("body").removeClass().addClass(currentTheme);
}

function changePageTheme() {
  if (currentTheme === "light") {
    currentTheme = "dark";
  } else if (currentTheme === "dark") {
    currentTheme = "orange";
  } else if (currentTheme === "orange") {
    currentTheme = "purple";
  } else if (currentTheme === "purple") {
    currentTheme = "red";
  } else if (currentTheme === "red") {
    currentTheme = "green";
  } else {
    currentTheme = "light";
  }
  localStorage.setItem("theme", currentTheme);
  setPageTheme(currentTheme);
}

// Check authentication
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login.html";
    return;
  }
}

// Call this on page load
checkAuth();
