import { getPatients } from './fetch-data.js';
import { setupModal } from './modal.js';
import './theme.js';

document.addEventListener("DOMContentLoaded", async () => {
  // Hamburger menu code
  const menuBtn = document.querySelector("#menu-btn");
  const nav = document.querySelector("#nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }

  // Load patients
  const container = document.querySelector("#data-container");
  if (!container) return;

  const data = await getPatients();
  if (!data.length) {
    container.innerHTML = "<p>Error loading data.</p>";
    return;
  }

  // Store data in container dataset for modal access
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

  // Initialize modal
  setupModal("#data-container", "#modal", "#modal-content", "#close-modal");
});
