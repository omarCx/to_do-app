let create = (ele) => document.createElement(ele)
let popupOpen = document.querySelector('.add-task-input')
let popupLayer = document.querySelector('.popup-layer')
let addTask = document.querySelector('.addTask')
let cancel = document.querySelector('.cancel')
let input = document.querySelector('.inputEle')
let divTasks = document.querySelector('.tasks')

let popup

popupOpen.addEventListener('click', () => {
    focus()
    // let layer = create("div")
    // layer.className = "popup-layer";
    // //Popup
    // let popup = create("div")
    // popup.className = "popup"
    // //Header
    // let popupHeading = create('h3');
    // popupHeading.innerHTML = 'Add New task';
    // popup.appendChild(popupHeading)
    // //Form
    // let form = create('div')
    // form.className = "form";

    //     let label = create('label')
    //     label.innerHTML = "Title";
    //     label.setAttribute('for', 'taskTitle')
    //     form.appendChild(label)

    //     let input = create('input')
    //     input.type = 'text';
    //     input.className = 'inputEle';
    //     input.id ='taskTitle'
    //     form.appendChild(input)

    //     let buttons = create('div');
    //     buttons.className = 'buttons';
    //     form.appendChild(buttons);

    //         let adding = create('button')
    //         adding.className = 'add';
    //         buttons.appendChild(adding);


    // //Appending To body
    // popup.appendChild(form)
    // layer.appendChild(popup)
    // document.body.appendChild(layer)
    
    popupLayer.classList.replace('close', 'open')
    popup = true
})

cancel.addEventListener('click', () => {
    input.value = ""
    popup = false
    popupLayer.classList.replace('open', 'close');
})

updateData()
let tasks = []
addTask.addEventListener('click', function () {
    let dateO = new Date()
    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let taskInfo = {
        title: input.value,
        id: Date.now(),
        date: `${months[dateO.getMonth()]} ${dateO.getDate()} ${dateO.getFullYear()}`
    }
    tasks.push(taskInfo)
    input.value = "";
    appendTask(tasks)
    addToLocalStorage(tasks)
    popupLayer.classList.replace('open', 'close');
})

function appendTask(array) {
    divTasks.innerHTML = ""

    array.forEach(ele => {
       let task = create('div')
       task.className = 'task';
       task.setAttribute("data-id", ele.id)
       // Inside Task ==>
        let title = create('h4');
        title.innerHTML = `${ele.title}`
        let div = create('div')
        let delButon = create('input')
        delButon.type = "button";
        delButon.className = 'delete';
        delButon.appendChild(document.createTextNode("Done"))
        div.appendChild(delButon)
        let dateSpan = create('span');
        dateSpan.innerHTML = `${ele.date}`
        div.appendChild(dateSpan)
        task.appendChild(title)
        task.appendChild(div)
        divTasks.appendChild(task)
    });
}

divTasks.addEventListener("click", (ele) => {
    if (ele.target.type === "button") {
        removeTask(ele.target.parentElement.parentElement.getAttribute("data-id"))
        ele.target.parentElement.parentElement.remove()
    }
})


function addToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function updateData() {
    let taskInLS = localStorage.getItem("tasks")
    if (taskInLS) {
        let tasks = JSON.parse(taskInLS)
        appendTask(tasks);
    }
}

function removeTask(id) {
   tasks = tasks.filter((ele) => ele.id != id)
   addToLocalStorage(tasks)
   console.log(tasks);
}













