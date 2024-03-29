// CODE EXPLAINED channel

/** 
******* TODO NOTE *************************/
//todo note button at footer
const todoNoteBtn = document.getElementById('todo-note-btn');
console.log(todoNoteBtn);
//todo note block
const todoNote = document.querySelector(".todo-block");

//hide note from the Note block Top bar DownArrow Btn
const downArrBtn = document.querySelector("#hide-note");
downArrBtn.addEventListener('click',function(){
  todoNote.classList.add("hide");
})
//toggle Todo-Note
todoNoteBtn.addEventListener('click', function(){
  console.log('click works'); 
  todoNote.classList.toggle("hide");
});



// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);



// add to do function
function addToDo(toDo, id, done, trash){
    
  if(trash){ return; }
  
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  
  const item = `<li class="item">
                  <i class="far ${DONE}" job="complete" id="${id}"></i>
                  <span class="text ${LINE}">${toDo}</span>
                  <i class="far fa-trash-alt" job="delete" id="${id}"></i>
                </li>
              `;
  
  const position = "beforeend";
  
  list.insertAdjacentHTML(position, item);
}




// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
  if(event.keyCode === 13){

      const toDo = input.value;
      
      // if the input isn't empty
      if(toDo){
          addToDo(toDo, id, false, false);
          
          LIST.push({
              name : toDo,
              id : id,
              done : false,
              trash : false
          });
          
          // add item to localstorage ( this code must be added where the LIST array is updated)
          localStorage.setItem("TODO", JSON.stringify(LIST));
          
          id++;
      }
      input.value = "";
  }
});

// complete to do
function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  
  LIST[element.id].trash = true;
}

// run function for complete/delete the the task items created on click on icon

list.addEventListener("click", function(event){
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete
  
  if(elementJob == "complete"){
      completeToDo(element);
  }else if(elementJob == "delete"){
      removeToDo(element);
  }
  
  // add item to localstorage ( this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});



console.log(todoNote);


/** TODO NOTE APP CLOSED */