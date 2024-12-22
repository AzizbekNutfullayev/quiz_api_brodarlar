const started = document.getElementById("started");
const modal = document.getElementById("myModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const userName = document.getElementById("userName");
const submitBtn = document.getElementById("submitBtn");

const openModalFunc = () => {
  alert("Enter your name");
  modal.style.display = "flex";
};
openModal.addEventListener("click", openModalFunc);

submitBtn.addEventListener("click", () => {
  started.innerText = userName.value;
  closeModalFunc();
});

const closeModalFunc = () => {
  modal.style.display = "none";
};
closeModal.addEventListener("click", closeModalFunc);
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
axios
.get('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple')
.then((response)=>{
  console.log(response.data); 
  
})