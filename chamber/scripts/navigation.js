// Select elements
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".navigation");

// Toggle navigation menu on hamburger click
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
});

// Highlight current page in navigation (Wayfinding)
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".navigation a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
