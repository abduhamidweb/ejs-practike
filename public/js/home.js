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