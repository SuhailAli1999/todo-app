// Global variable
const todoList = document.querySelector(".todo-list");
var userInput = document.getElementById("user-input");

// Add new todo card to the list
document
  .getElementById("add-to-list-btn")
  .addEventListener("click", addCardToTheList);

// Check completed and delete btns
todoList.addEventListener("click", checkAndDeleteBtns);

// filter cards
document.querySelector(".filter-btns").addEventListener("click", filter);
//Clear completed
document.querySelector(".clear-btn").addEventListener("click", clearCompleted);

//Theme switcher
document.getElementById("theme-switcher").addEventListener("click", () => {
  if (document.querySelector("html").hasAttribute("data-theme", "dark")) {
    console.log("if")
     document.getElementById("theme-switcher").innerHTML = ` <img src="images/icon-moon.svg" alt="moon" />`;
    document.querySelector("html").removeAttribute("data-theme");
    document.querySelector("body").style.transition = ".6s";
  } else {
    console.log("else")
    document.getElementById("theme-switcher").innerHTML = ` <img src="images/icon-sun.svg" alt="sun" />`;
    document.querySelector("html").setAttribute("data-theme", "dark");
    document.querySelector("body").style.transition = ".6s";
  }
});

function addCardToTheList(e) {
  let newCard = ` 
    <li class="card active">
    <div class="cb-container">
      <input class="check-input" type="checkbox" />
      <span class="check-icon"></span>
    </div>
    <p id="user-input-text">${userInput.value}</p>
    <div class="delete-hover">
      <img class="delete-btn" src="images/icon-cross.svg" alt="" />
    </div>
  </li>`;
  if (userInput.value == "") {
  } else {
    active++;
    todoList.innerHTML += newCard;
    userInput.value = "";
    document.querySelector(".empty").style.display = "none";

    document.getElementById("all").click();
    checkLeft();
  }
}

function checkAndDeleteBtns(e) {
  if (e.target.classList.contains("check-input")) {
    e.target.parentElement.parentElement.classList.toggle("completed");
    e.target.parentElement.parentElement.classList.toggle("active");
    e.target.toggleAttribute("checked");
    checkLeft();
  } else if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.parentElement.remove();

    checkLeft();
    if (checkLeft() === 0) {
      document.querySelector(".empty").style.display = "flex";
    }
  }
}

function checkLeft() {
  let leftItems = 0;
  for (let i = todoList.children.length - 1; i >= 1; i--) {
    if (todoList.children[i].classList.contains("completed")) {
      continue;
    }
    leftItems++;
  }

  document.querySelector(
    ".item-left span"
  ).innerText = `${leftItems} items left`;
  return leftItems;
}

function filter(e) {
  let all = 0;
  let active = 0;
  let completed = 0;

  switch (e.target.id) {
    case "all":
      document.getElementById("completed").classList.remove("btn-on");
      document.getElementById("active").classList.remove("btn-on");
      document.getElementById(e.target.id).classList.add("btn-on");

      for (card of todoList.children) {
        card.style.display = "flex";
      }
      if (checkLeft() === 0) {
        noTaskMessage("No tasks to show");
      } else {
        document.querySelector(".empty").style.display = "none";
      }
      break;

    case "active":
      document.getElementById("all").classList.remove("btn-on");
      document.getElementById("completed").classList.remove("btn-on");
      document.getElementById(e.target.id).classList.add("btn-on");

      for (card of todoList.children) {
        if (card.classList.contains("active")) {
          card.style.display = "flex";
          active++;
        } else {
          card.style.display = "none";
        }
      }
      if (active === 0) {
        noTaskMessage("No active tasks to show");
      }

      break;
    case "completed":
      document.getElementById("all").classList.remove("btn-on");
      document.getElementById("active").classList.remove("btn-on");
      document.getElementById(e.target.id).classList.add("btn-on");

      for (card of todoList.children) {
        if (card.classList.contains("completed")) {
          card.style.display = "flex";
          completed++;
        } else {
          card.style.display = "none";
        }
      }
      if (completed === 0) {
        noTaskMessage("No completed tasks to show");
      }
      break;
  }
}

function noTaskMessage(m) {
  var message = m;
  document.querySelector(".empty span").innerHTML = m;
  document.querySelector(".empty").style.display = "flex";
}

function clearCompleted(e) {
  for (let i = todoList.children.length - 1; i >= 0; i--) {
    if (todoList.children[i].classList.contains("completed")) {
      todoList.children[i].remove();
    }
  }
}
