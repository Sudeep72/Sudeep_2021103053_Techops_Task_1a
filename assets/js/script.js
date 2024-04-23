"use strict";

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", activeElemOnScroll);

/**
 * about
 */
document.addEventListener("DOMContentLoaded", function () {
  var moreAboutBtn = document.getElementById("more-about-btn");
  var additionalContent = document.querySelector(".additional-content");

  moreAboutBtn.addEventListener("click", function (event) {
    event.preventDefault();
    additionalContent.classList.toggle("visible");
    moreAboutBtn.innerText = additionalContent.classList.contains("visible")
      ? "Show Less"
      : "More About Us";
  });
});

/**
 * projects
 */
document.addEventListener("DOMContentLoaded", function () {
  var hiddenProjects = document.querySelectorAll(".hidden-project");
  hiddenProjects.forEach(function (project) {
    project.classList.add("fade-in");
    project.style.display = "none";
  });

  var showMoreButton = document.getElementById("show-more-projects");
  var showLessButton = document.getElementById("show-less-projects");

  showMoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    hiddenProjects.forEach(function (project) {
      project.style.display = "block";
      project.classList.remove("fade-out");
      project.classList.add("fade-in");
    });
    showMoreButton.style.display = "none";
    showLessButton.style.display = "flex";
  });

  showLessButton.addEventListener("click", function (event) {
    event.preventDefault();
    hiddenProjects.forEach(function (project, index) {
      project.classList.remove("fade-in");
      project.classList.add("fade-out");
      setTimeout(function () {
        project.style.display = "none";
        if (index === hiddenProjects.length - 1) {
          showMoreButton.style.display = "flex";
          showLessButton.style.display = "none";
        }
      }, 500);
    });
  });

  var lazyImages = document.querySelectorAll("img[data-src]");
  if ("IntersectionObserver" in window) {
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute("data-src");
          imageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      imageObserver.observe(lazyImage);
    });
  } else {
    lazyImages.forEach(function (lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.removeAttribute("data-src");
    });
  }
});

/**
 * Tech stack
 */

function showSubsection(section) {
  var subsections = document.querySelectorAll(".subsection");
  subsections.forEach(function (subsection) {
    subsection.classList.remove("show");
  });

  document.getElementById(section).classList.add("show");

  var buttons = document.querySelectorAll(".button");
  buttons.forEach(function (button) {
    button.classList.remove("active");
  });
  document.getElementById(section + "-btn").classList.add("active");
}
showSubsection("frontend");
