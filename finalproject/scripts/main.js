import { getPatients } from './fetch-data.js';
import { setupModal } from './modal.js';
import './theme.js';

document.addEventListener("DOMContentLoaded", async () => {

  // =========================
  // Hamburger Menu
  // =========================
  const menuBtn = document.querySelector("#menu-btn");
  const nav = document.querySelector("#nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }

  // =========================
  // Form Submission Output
  // =========================
  const output = document.getElementById("output");

  if (output) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");

    if (name && email) {
      output.textContent =
        `Thank you ${name}! We will contact you at ${email}.`;
    }
  }

  // =========================
  // Load Patient Data
  // =========================
  const container = document.querySelector("#data-container");
  if (!container) return;

  try {
    const data = await getPatients();

    if (!data.length) {
      container.innerHTML = "<p>Error loading data.</p>";
      return;
    }

    container.dataset.items = JSON.stringify(data);
    container.innerHTML = "";

    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Appointment:</strong> ${item.appointment}</p>
        <p><strong>Service:</strong> ${item.service}</p>
        <p><strong>Payment:</strong> ${item.payment}</p>
        <button data-id="${item.id}">View Details</button>
      `;

      container.appendChild(card);
    });

    setupModal("#data-container", "#modal", "#modal-content", "#close-modal");

  } catch (error) {
    container.innerHTML = "<p>Unable to load patient data.</p>";
    console.error(error);
  }

});

// Footer: display last modified date
const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
  lastModifiedEl.textContent = document.lastModified;
}
