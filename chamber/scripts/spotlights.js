// Spotlight Members Script
const spotlightContainer = document.querySelector("#spotlight-container");
const membersURL = "data/members.json";

// Fetch and display spotlight members
async function getSpotlightMembers() {
  try {
    const response = await fetch(membersURL);
    if (!response.ok) throw new Error("Failed to fetch members data");

    const data = await response.json();

    // Filter only Silver (2) and Gold (3) members
    const eligibleMembers = data.members.filter(
      member => member.membership === 2 || member.membership === 3
    );

    // Shuffle members randomly
    const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());

    // Select 2 or 3 members for spotlight
    const numberToDisplay = Math.floor(Math.random() * 2) + 2;
    const selectedMembers = shuffledMembers.slice(0, numberToDisplay);

    displaySpotlights(selectedMembers);

  } catch (error) {
    console.error("Error loading spotlight members:", error);
  }
}

// Render spotlight cards
function displaySpotlights(members) {
  spotlightContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
    `;

    spotlightContainer.appendChild(card);
  });
}

// Map membership numbers to labels
function getMembershipLevel(level) {
  switch (level) {
    case 2: return "Silver Member";
    case 3: return "Gold Member";
    default: return "Member";
  }
}

// Initialize spotlight on page load
getSpotlightMembers();
