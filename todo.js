const toDoForm = document.querySelector(".js-toDoForm"),
   toDoInput = toDoForm.querySelector("#askTodo"),
   toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "loadedTodos";

let toDos = [];

function delToDo(evt) {
   const targetNode = evt.target.parentNode,
      targetId = evt.target.parentNode.id,
      cleanToDos = toDos.filter(toDo => { //arr 안에 있는 모든 toDos를 돔.
         return toDo.id !== parseInt(targetId); //filter는 true인거 새 배열로 
      });
   toDoList.removeChild(targetNode); //HTML 삭제
   toDos = cleanToDos;
   saveToDos();

   // localStorage.removeItem(targetNode); // 스토리지 삭제 xxxxxxxxxxx
   // toDos.pop(targetNode); //배열에서 삭제
}

function saveToDos() {
   localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  //obj를 str으로 바꿈
}

function paintToDo(text) {
   const li = document.createElement("li"),
      delBtn = document.createElement("button"),
      span = document.createElement("span"),
      newId = toDos.length + 1;

   delBtn.id = "delBtn"
   delBtn.innerText = "✖️";
   delBtn.addEventListener("click", delToDo);

   span.innerText = text;

   li.classList.add("list-group-item");
   li.appendChild(span);
   li.appendChild(delBtn);
   li.id = newId;
   
   toDoList.appendChild(li);

   const todoObj = {
      text: text,
      id: newId,
   };
   toDos.push(todoObj);
   saveToDos();
}

function handleSubmit(evt) {
   evt.preventDefault();
   const currentValue = toDoInput.value;
   paintToDo(currentValue);
   toDoInput.value = ""; //입력 값 비워주기
}

function loadToDos() {
   const loadedTodos = localStorage.getItem(TODOS_LS);
   if (loadedTodos !== null) {  //toDos가 있으면
      const parsedTodos = JSON.parse(loadedTodos); // js obj로 변환
      parsedTodos.forEach(todo => { //foreach array 각각 한번씩 f 실행
         paintToDo(todo.text);
      });
   }
}

function initTodo() {
   loadToDos();
   toDoForm.addEventListener("submit", handleSubmit);
}

initTodo();
