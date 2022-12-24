// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option"); // console.log(mainColors); // null

// If There's Color Item In Local Storage
if (mainColors !== null) {
  // console.log("Local Storage Is Not Empty You Can Set It On Root Now");
  // console.log(localStorage.getItem("color_option"));
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option") // mainColors
  );
  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
  // console.log("Not Empty");
  // console.log(backgroundLocalItem); // false
  // console.log(typeof backgroundLocalItem); // string
  if (backgroundLocalItem === "true") {
    //backgroundOption = true;
  } else {
    //backgroundOption = false;
  }
  // console.log(backgroundLocalItem);
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin For Rotation on Self
  this.classList.toggle("fa-spin"); // this: document.querySelector(".toggle-settings .fa-gear")
  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li"); // const colorsLi = Array.from(document.querySelectorAll(".colors-list li")); // console.log(colorsLi);

// Loop On All List Items
colorsLi.forEach((li) => {
  // console.log(li);
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color); // #ff9800 | #e91e63 | #009688 | #03a9f4 | #4caf50
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    // // Remove Active Class From All Childrens
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // // Add Active Class On Self
    // e.target.classList.add("active");
    handleActive(e);
  });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans
randomBackEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    // // Remove Active Class From All Childrens
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // // Add Active Class On Self
    // e.target.classList.add("active");
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      // console.log("Yes");
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      // console.log("No");
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]; // ممكن تحط الصورة بالمسار بتاعها الكامل | ممكن تحط اسم الصورة بالإمتداد | ممكن تحط اسم الصورة من غير امتداد

// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length); // console.log(randomNumber); // 0 1 2 3 4
      // Change Background Image Url
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}

randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // this.console.log(skillsOffsetTop); // 1067

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // this.console.log(skillsOuterHeight); // 635
  // <div class="skills"></div> تبع قسم ال Height نفس ال

  // Window Height
  let windowHeight = this.innerHeight;
  // this.console.log(windowHeight); // 714
  // في الصفحة zoom out بيتغير حسب ال

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // this.console.log("Skills Section Reached");
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Greate Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To Overlay
    overlay.className = "popup-overlay";
    // Append Ovelay To The Body
    document.body.appendChild(overlay);
    // Create The Popup Box
    let popupBox = document.createElement("div");
    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // Create text For Heading
      let imgText = document.createTextNode(img.alt);
      // Append The Text To The Heading
      imgHeading.appendChild(imgText);
      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img"); // console.log(img.src);
    // Set Image Source
    popupImage.src = img.src;
    // Add Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");
    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");
    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    // Add class To Close Button
    closeButton.className = "close-button";
    // Add close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault(); /* link الإفتراضي على شان ال "#" يلي على ال behavior منع ال */
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  // console.log("Not Empty");
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
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  // Reload Window
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation(); // menu يعني لما اضغط عليهم مش هيسكرو ال <= [This Is Not...] ما ييجي span على شان لما أضغط على الثلاثة
  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");
  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // console.log("This Is Not The Button And Not The Menu");
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      // console.log("Menu Is Open");
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");
      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation(); // menu يعني لما اضغط عليهم مش هيسكرو ال <= [This Is Not...] ما ييجي ul li على شان لما أضغط على
};
