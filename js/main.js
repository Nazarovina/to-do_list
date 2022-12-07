        
        let taskNameInput = document.querySelector("#task-name-input");
        let addTaskButton = document.querySelector("#add-task-btn");
        let startMessage = document.querySelector("#start-message");
        let showAllButton = document.querySelector("#show-all-btn");
        let showNotCompletedButton = document.querySelector("#show-not-completed-btn");
        let taskList = document.querySelector(".task-list");

        let tasks = [];

        addTaskButton.addEventListener("click", addTaskHandler);
        showAllButton.addEventListener("click", showAllHandler);
        showNotCompletedButton.addEventListener("click", showNotCompletedHandler);

        taskNameInput.addEventListener("keydown", function (e) {
            if (e.code == "Enter") addTaskHandler();
        })

        function addTaskHandler() {
            if (taskNameInput.value) {
                if (!startMessage.hidden) startMessage.hidden = true;

                let newTask = new Task(taskNameInput.value);
                newTask.createIn(taskList);
                tasks.push(newTask);

                taskNameInput.value = "";
            } else {
                alert("Введите имя задачи");
            }
        }

        function showAllHandler() {
            taskList.innerHTML = "";
            tasks.forEach(task => {
                task.createIn(taskList);
            });
        }

        function showNotCompletedHandler() {
            taskList.innerHTML = "";
            tasks
                .filter(task => task.isDone == false)
                .forEach(task => {
                    task.createIn(taskList);
                });
        }

        class Task {
            constructor(text) {
                this.text = text;
                this.isDone = false;
                this.div = null;
            }

            createIn(element) {
                this.div = document.createElement("div");
                this.div.classList.add("task");

                let input = document.createElement("input");
                input.addEventListener("click", () => this.changeState(this.div));
                input.type = "checkbox";

                let p = document.createElement("p");
                p.innerText = this.text;

                let del = document.createElement("div")
                del.classList.add("del_button")
                del.addEventListener("click", () => this.deleteTask(this.div))

                this.div.append(input);
                this.div.append(p);
                this.div.append(del);

                if (this.isDone) {
                    this.div.classList.add("completed");
                    input.checked = true;
                }
                element.append(this.div);
            }

            changeState(element) {
                this.isDone = !this.isDone;
                element.classList.toggle("completed");
            }

            deleteTask (element) {
                element.remove()
            }
            
        }