const started = document.getElementById("started");
const modal = document.getElementById("myModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const userName = document.getElementById("userName");
const submitBtn = document.getElementById("submitBtn");
const nextpage = document.getElementById("game");
 const difficultyToggle = document.getElementById("difficultyToggle");
  const difficultyOptions = document.getElementById("difficultyOptions");
  const selectedLevel = document.getElementById("selectedLevel");

// Open modal
openModal.addEventListener("click", () => {
  alert("Enter your name");
  modal.style.display = "flex";
});

// Submit name
submitBtn.addEventListener("click", () => {
  if (userName.value === "") {
    alert("Name is required");
    return;
  }

  started.innerText = userName.value;
  closeModalFunc();
});

// Close modal
closeModal.addEventListener("click", closeModalFunc);

function closeModalFunc() {
  modal.style.display = "none";
}

// Close modal on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Fetch trivia questions
axios
  .get("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
  .then((response) => {
    console.log(response.data);

    nextpage.addEventListener("click", (e) => {
      if (userName.value === "") {
        e.preventDefault();
        alert("Enter your name");
      }
    });
  });
 
  
  difficultyToggle.addEventListener("click", () => {
    difficultyOptions.style.display =
      difficultyOptions.style.display === "block" ? "none" : "block";
  });
  
  difficultyOptions.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      const value = item.dataset.value;
      selectedLevel.textContent = `Selected: ${value.charAt(0).toUpperCase() + value.slice(1)}`;
      difficultyOptions.style.display = "none";
      localStorage.setItem("difficulty", value);
    });
  });
  
  // Auto close on click outside
  window.addEventListener("click", (e) => {
    if (!difficultyToggle.contains(e.target) && !difficultyOptions.contains(e.target)) {
      difficultyOptions.style.display = "none";
    }
  });
  