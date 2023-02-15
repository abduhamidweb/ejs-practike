const elBtn = document.querySelectorAll(".btn-delete")
async function POST() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // window.location.reload()
        try {
            if (inputTime.value.trim().length > 0 && inputTask.value.trim().length > 0) {
                fetch("http://localhost:3000/todo", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        time: inputTime.value.trim(),
                        task: inputTask.value.trim()
                    })
                }).then((response) => response.json()).then(({
                    status,
                    location
                }) => location ? window.location = location : "/")
                inputTime.value = "";
                inputTask.value = "";
            } else {
                throw new Error("Invalid input time " + inputTime.value + " in task " + inputTask.value)
            }
        } catch (err) {
            console.log(err)
        }
    })
}
POST();
elBtn.forEach(item => {
    item.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-id")) {
            DELETE(e.target.getAttribute("data-id"));
        }
    })
})

function DELETE(e) {
    fetch("http://localhost:3000/todos/" + e, {
        method: "DELETE"
    }).then((response) => response.json()).then(({
        status,
        location
    }) => location ? window.location = location : "/")
}
// Update the tasks list with time
window.addEventListener("click", (e) => {

})
async function updateTask(value, id) {
    const updateTaskFetch = await fetch(`http://localhost:3000/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: value
        })
    })
    const {
        status,
        location
    } = await updateTaskFetch.json()
    location ? window.location = location : "/"
}

function updateTasksList() {
    let elUpdatBtn = document.querySelectorAll(".btn-danger")
    const task = document.querySelectorAll(".taskWrapper");
    task.forEach((task) => {
        task.addEventListener("click", (e) => {
            let target = e.target.getAttribute("data-update");
            if (e.target.classList.contains("taskWrapper")) {
                let elInput = document.createElement("input");
                elInput.setAttribute("class", "taskWrapper taskInput")
                elInput.type = "text";
                elInput.value = task.textContent;
                task.parentNode.replaceChild(elInput, task);
                elInput.focus();
            }
            elUpdatBtn.forEach((el) => {
                if (el.getAttribute("data-id") == target) {
                    el.setAttribute("class", "btn btn-info btn-delete mt-2 mb-2");
                    el.removeAttribute("data-id");
                    el.setAttribute("data-id2", target)
                    el.innerHTML = `<i class="bi bi-check2"></i>`
                    el.addEventListener("click", () => {
                        let inputValue = document.querySelector(".taskInput").value.trim()
                        if (inputValue) {
                            updateTask(inputValue, target)
                        }
                    })
                }
            })

        })
    })


}
updateTasksList()