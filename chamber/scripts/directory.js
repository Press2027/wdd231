const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

async function getMembers(){
  const res = await fetch("data/members.json");
  const data = await res.json();
  displayMembers(data.members);
}
function displayMembers(members){
  membersContainer.innerHTML="";
  members.forEach(member=>{
    const card = document.createElement("section");
    card.className="member-card";
    card.innerHTML=`<img src="images/${member.image}" alt="${member.name}">
    <h2>${member.name}</h2>
    <p><strong>Address:</strong> ${member.address}</p>
    <p><strong>Phone:</strong> ${member.phone}</p>
    <p><strong>Membership:</strong> ${member.membership===1?"Member":member.membership===2?"Silver":"Gold"}</p>`;
    membersContainer.appendChild(card);
  });
}

gridBtn.addEventListener("click", ()=>{membersContainer.classList.add("grid");membersContainer.classList.remove("list");});
listBtn.addEventListener("click", ()=>{membersContainer.classList.add("list");membersContainer.classList.remove("grid");});

membersContainer.classList.add("grid");
getMembers();
