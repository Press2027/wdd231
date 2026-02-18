// modal.js
export function setupModal(containerSelector, modalSelector, modalContentSelector, closeBtnSelector) {
  const container = document.querySelector(containerSelector);
  const modal = document.querySelector(modalSelector);
  const modalContent = document.querySelector(modalContentSelector);
  const closeModal = document.querySelector(closeBtnSelector);

  if (!container || !modal || !modalContent || !closeModal) return;

  // Close button event
  closeModal.addEventListener("click", () => modal.close());

  // Open modal when a button inside container is clicked
  container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = e.target.dataset.id;
      const data = container.dataset.items ? JSON.parse(container.dataset.items) : [];

      const selected = data.find(item => item.id == id);
      if (!selected) return;

      modalContent.innerHTML = `
        <h3>${selected.name}</h3>
        <p><strong>Appointment:</strong> ${selected.appointment}</p>
        <p><strong>Service:</strong> ${selected.service}</p>
        <p><strong>Payment Status:</strong> ${selected.payment}</p>
      `;

      modal.showModal();
      localStorage.setItem("lastViewedPatient", id);
    }
  });
}
