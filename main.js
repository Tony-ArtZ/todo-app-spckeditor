class TASK {
  constructor(id, task, checked) {
    this.id = id;
    this.task = task;
    this.checked = checked;
  }
}

let currTasks = []

const button = document.querySelector(".task-add-button")

const input = document.querySelector(".task-input")

const body = document.querySelector("#body")

let taskView = document.querySelector("#task-section")

const setTasks = (task) => {
  localStorage.setItem("tasks", JSON.stringify(task))
}
const update = () => {
  currTasks = JSON.parse(localStorage.getItem("tasks"))
  body.removeChild(taskView)
  taskView = document.createElement("section")
  taskView.id = "task-section"
  body.append(taskView)
  currTasks?.forEach((tasks) => {
    const container = document.createElement("div")
    container.classList.add("task")
    const input = document.createElement("input")
    input.type = "text"
    input.value = tasks.task
    input.readOnly = false
    input.classList.add("task-item")
    container.appendChild(input)
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "x"
    deleteButton.classList.add("task-delete")
    deleteButton.addEventListener("click", (e) => {
      currTasks=currTasks.filter((item)=>{return item.id != tasks.id})
      setTasks(currTasks)
      update()
    })
    container.append(deleteButton)
    const checkBox = document.createElement("input");
    checkBox.type="checkBox"
    checkBox.classList.add("task-checkBox")
    checkBox.checked = tasks.checked
    checkBox.checked?input.classList.add("checked"):input.classList.remove("checked")
    checkBox.addEventListener("change",(e)=>{
  currTasks[tasks.id].checked=checkBox.checked
  setTasks(currTasks)
  update()
    })
    container.append(checkBox)
    taskView.appendChild(container)
  })
}

update()

button.addEventListener("click", () => {
  if(input.value != ""){
  const task = new TASK(currTasks.length, input.value, false)
  currTasks.push(task)
  setTasks(currTasks)
  input.value = ""
  update()
  }
  else{
    alert ("Empty Input")
  }
})