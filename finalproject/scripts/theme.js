// theme.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector("#theme-toggle");

  if (!toggleBtn) return;

  // Apply saved theme, default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.remove("dark"); // ensure clean start
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  // Update button text for clarity
  toggleBtn.textContent = savedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  // Toggle theme on click
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Update button text dynamically
    toggleBtn.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
  });
});
