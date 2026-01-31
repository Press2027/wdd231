// navigation.js
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector(".navigation");

  // Toggle navigation on hamburger click
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    hamburger.classList.toggle("open");
  });

  // Auto-active link based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navigation a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
