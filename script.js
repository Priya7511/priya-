// ================= COUNTER =================
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / 200;

    if(count < target){
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update, 10);
    } else {
      counter.innerText = target;
    }
  };
  update();
});


// ================= FAQ =================
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.maxHeight =
      answer.style.maxHeight ? null : answer.scrollHeight + "px";
  });
});


// ================= TEAM TOGGLE =================
function toggleTeam(header){

  const card = header.parentElement;
  const description = card.querySelector(".team-description");

  // Close other cards
  document.querySelectorAll(".team-card").forEach(item=>{
    if(item !== card){
      item.classList.remove("active");
      item.querySelector(".team-description").style.height = "0px";
    }
  });

  if(card.classList.contains("active")){
    card.classList.remove("active");
    description.style.height = "0px";
  } else {
    card.classList.add("active");
    description.style.height = description.scrollHeight + "px";
  }
}