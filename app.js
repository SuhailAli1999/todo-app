

document.getElementById("add-to-list-btn").addEventListener("click", addToTheList);


function addToTheList() {

  const todoList = document.getElementById("todo-list");
  let userInput = document.getElementById("user-input").value;
  
  let newCard = ` 
  <li class="card">
   <div class="cb-container">
    <input class="check-input" id="check-input" type="checkbox" />
    <span class="check-icon"></span>
   </div>
   <p>${userInput}</p>
   <div class="delate-btn">
    <img src="/images/icon-cross.svg" alt="" />
   </div>
  </li>`;

  todoList.innerHTML += newCard;
  userInput = "";
 
}
