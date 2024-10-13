const colors = {
  green: "128, 193, 139",
  red: "228, 89, 89",
};

barba.init({
  preventRunning: true,
  views: [
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

// Move the custom cursor according to mouse movement
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  posX += (mouseX - posX) * cursorSmoothFactor; // Smooth transition for X
  posY += (mouseY - posY) * cursorSmoothFactor; // Smooth transition for Y

  // customCursor.style.transform = `translate(${posX}px, ${posY}px)`; // Move cursor
  customCursor.style.left = `${posX - currentSize / 2}px`; // Centering the cursor
  customCursor.style.top = `${posY - currentSize / 2}px`;

  requestAnimationFrame(animateCursor); // Continue the animation
}

function cursorTarget() {
  document.querySelectorAll("a").forEach((item) => {
    item.addEventListener("mouseover", (e) => {
      // currentSize = 100;
      // customCursor.style.width = currentSize + "px";
      customCursor.style.transform = "scale(4)";

      //customCursor.style.border = "1px solid white";
      customCursor.style.backgroundColor = "rgba(var(--base-color), 0)";
      customCursor.style.backdropFilter = "sepia(100%) ";
    });
    item.addEventListener("mouseout", (e) => {
      //currentSize = 20;

      //customCursor.style.width = currentSize + "px";
      customCursor.style.transform = "scale(1)";

      customCursor.style.mixBlendMode = "normal";
      customCursor.style.backgroundColor = "white";
    });
  });
}

function initialize() {
  animateCursor(); // Start the animation loop
  cursorTarget();
}

initialize();

barba.hooks.after(() => {
  initialize();
});

// function delay(n) {
//   n = n || 2000;
//   return new Promise((done) => {
//     setTimeout(() => {
//       done();
//     }, n);
//   });
// }

// function pageTransition() {
//   var tl = gsap.timeline();
//   tl.to(".loading-screen", {
//     duration: 1,
//     height: "100%",
//     bottom: "0%",
//     ease: "Expo.easeInOut",
//   });

//   tl.to(".loading-screen", {
//     duration: 1.2,
//     height: "100%",
//     bottom: "100%",
//     ease: "Expo.easeInOut",
//     // delay: 0.3,
//   });
//   tl.set(".loading-screen", { bottom: "-100%" });
// }

// function contentAnimation() {
//   var tl = gsap.timeline();
//   tl.from(".animate-this", {
//     duration: 1,
//     y: 30,
//     opacity: 0,
//     stagger: 0.4,
//     delay: 0.2,
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   barba.init({
//     sync: true,

//     transitions: [
//       {
//         async leave(data) {
//           const done = this.async();

//           pageTransition();
//           await delay(1000);
//           done();
//         },

//         async enter(data) {
//           contentAnimation();
//         },

//         async once(data) {
//           contentAnimation();
//         },
//       },
//     ],
//   });
// });

// barba.hooks.beforeLeave((data) => {
//   console.log("BRUH");
//   const loading = document.querySelector(".loading-screen");
//   // loading.style.backgroundColor = data.current.container.style.backgroundColor;
//   console.log(data.current.container.style.backgroundColor);
// });
