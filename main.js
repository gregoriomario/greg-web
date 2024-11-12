const colors = {
  green: "128, 193, 139",
  red: "228, 89, 89",
  dark: "35,35,35",
  light: "255,255,255",
};

barba.init({
  preventRunning: true,
  views: [
    {
      namespace: "home",
      beforeEnter: (data) => {
        setCSSRootVar("--base-color", colors.dark);
      },
      beforeLeave: (data) => {
        setCSSRootVar("--base-color", colors.light);
      },
    },
    {
      namespace: "about",
      beforeEnter: (data) => {
        setCSSRootVar("--current-color", colors.red);
      },
    },
    {
      namespace: "contact",
      beforeEnter: (data) => {
        setCSSRootVar("--current-color", colors.green);
      },
    },
  ],
  transitions: [
    {
      name: "slide-transition",
      sync: true,
      leave(data) {
        return gsap.to(data.current.container, {
          x: "-100%",
          duration: 1,
        });
      },

      enter(data) {
        return gsap.from(data.next.container, {
          x: "100%",
          duration: 1,
        });
      },
    },
    {
      name: "self",
      leave(data) {
        return gsap.to(".eye", {
          height: "50vh",
          duration: 1,
          ease: "power1.inOut",
        });
      },

      enter(data) {
        return gsap.to(".eye", {
          height: "0vh",
          duration: 1,
          ease: "power1.inOut",
        });
      },
    },
  ],
});

function setCSSRootVar(rootVar, value) {
  document.documentElement.style.setProperty(rootVar, value);
}

const customCursor = document.querySelector(".custom-cursor");
const cursorSmoothFactor = 0.1; // Adjust this value for smoother movement

let mouseX = 0,
  mouseY = 0; // Initialize mouse coordinates
let posX = 0,
  posY = 0; // Initialize cursor position
let currentSize = 20;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  posX += (mouseX - posX) * cursorSmoothFactor; // Smooth transition for X
  posY += (mouseY - posY) * cursorSmoothFactor; // Smooth transition for Y

  customCursor.style.left = `${posX - currentSize / 2}px`; // Centering the cursor
  customCursor.style.top = `${posY - currentSize / 2}px`;

  requestAnimationFrame(animateCursor); // Continue the animation
}

function cursorTarget() {
  document.querySelectorAll("a").forEach((item) => {
    item.addEventListener("mouseover", (e) => {
      customCursor.style.transform = "scale(4)";
      customCursor.style.backgroundColor = "rgba(var(--base-color), 0)";
      customCursor.style.backdropFilter = "sepia(100%) ";
    });
    item.addEventListener("mouseout", (e) => {
      customCursor.style.transform = "scale(1)";
      customCursor.style.mixBlendMode = "normal";
      customCursor.style.backgroundColor = "white";
    });
  });
}

function aboutScroll() {
  const scrollSection = document.querySelector("#about-section-job");
  const aboutRole = document.querySelectorAll(".about-role-item");
  scrollSection &&
    scrollSection.addEventListener("scroll", function (event) {
      const top = scrollSection.scrollTop;
      if (top > 400) {
        aboutRole[2].classList.add("fade-in");
        aboutRole[2].classList.remove("hidden");
        // aboutRole[2].style.opacity = 0.5;
        // aboutRole[1].style.opacity = 0.75;
      } else if (top > 200) {
        // aboutRole[2].style.opacity = 0.75;
        aboutRole[2].classList.add("hidden");
        aboutRole[1].classList.remove("hidden");
        aboutRole[1].classList.add("fade-in");
      } else {
        aboutRole[1].classList.add("hidden");
      }
    });
}

function initialize() {
  animateCursor(); // Start the animation loop
  cursorTarget();
  aboutScroll();
}

initialize();

barba.hooks.after(() => {
  initialize();
});
