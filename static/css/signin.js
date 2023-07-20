const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const panel = document.querySelector(".panel");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");

});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
 
});
$(document).ready(function(){
  // Hide the alert after 5 seconds
  setTimeout(function(){
    $("#sigiin").alert('close');
  }, 3000);
});