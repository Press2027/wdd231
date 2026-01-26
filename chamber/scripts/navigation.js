const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".navigation");

// Hamburger toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
});

// Auto active link
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".navigation a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
