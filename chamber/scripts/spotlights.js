const spotlightContainer = document.querySelector("#spotlight-container");
async function getSpotlightMembers() {
  const res = await fetch("data/members.json");
  const data = await res.json();
  const eligible = data.members.filter(m=>m.membership===2||m.membership===3);
  const shuffled = eligible.sort(()=>0.5-Math.random());
  const numberToDisplay = Math.floor(Math.random()*2)+2;
  displaySpotlights(shuffled.slice(0,numberToDisplay));
}
function displaySpotlights(members){
  spotlightContainer.innerHTML="";
  members.forEach(member=>{
    const card=document.createElement("article");
    card.className="spotlight-card";
    card.innerHTML=`<img src="images/${member.image}" alt="${member.name} logo">
    <h3>${member.name}</h3>
    <p><strong>Membership:</strong> ${member.membership===2?"Silver Member":"Gold Member"}</p>
    <p><strong>Phone:</strong> ${member.phone}</p>
    <p><strong>Address:</strong> ${member.address}</p>
    <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>`;
    spotlightContainer.appendChild(card);
  });
}
getSpotlightMembers();
