/* ============================================================================== */

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

setInterval(() => {
  let randomNumber = Math.floor(Math.random() * imgsArray.length);
  landingPage.style.backgroundImage =
    'url("imgs/' + imgsArray[randomNumber] + '")';
}, 10000);

/* ============================================================================== */

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

/* ============================================================================== */

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
  });
});

/* ============================================================================== */

let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    localStorage.setItem("color_option", e.target.dataset.color);
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // e.target.classList.add("active");
    handleActive(e);
  });
});

/* ============================================================================== */

let backgroundOption = true;

let backgroundInterval;

const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // e.target.classList.add("active");
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
    }
  });
});

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}

randomizeImgs();

/* ============================================================================== */

let backgroundLocalItem = localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      localStorage.setItem("background-option", true);
    } else {
      localStorage.setItem("background-option", false);
    }
  });
});

/* ============================================================================== */

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

/* ============================================================================== */

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    let popupImage = document.createElement("img");
    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

/* ============================================================================== */

/* ------------------------------------------------------------------------------ *|
// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// console.log(allBullets);
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Select All Links
const allLinks = document.querySelectorAll(".links a");
// console.log(allBullets);
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); /* الإفتراضي behavior منع ال *|
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
/* ------------------------------------------------------------------------------ */

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault(); /* الإفتراضي behavior منع ال */
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

/* ============================================================================== */

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

/* ============================================================================== */

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
    } else {
      bulletsContainer.style.display = "none";
    }
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // e.target.classList.add("active");
    handleActive(e);
  });
});

/* ============================================================================== */

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      localStorage.setItem("bullets_option", "block");
    } else {
      localStorage.setItem("bullets_option", "none");
    }
  });
});

/* ============================================================================== */

document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets_option");
  // localStorage.removeItem("color_option", "background-option", "bullets_option");
  window.location.reload();
};

/* ============================================================================== */

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (
      toggleBtn.classList.contains("menu-active") &&
      tLinks.classList.contains("open")
    ) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};

/* ============================================================================== */
