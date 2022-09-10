// Api CRUD operations
const Api = (() => {
    const baseUrl = "http://localhost:3000";
    const todopath = "todos";
  
    const getTodos = () =>
      fetch([baseUrl, todopath].join("/")).then((response) => response.json());
  
    const deleteTodo = (id) =>
      fetch([baseUrl, todopath, id].join("/"), {
        method: "DELETE",
      });
  
    const addTodo = (todo) =>
      fetch([baseUrl, todopath].join("/"), {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
  
    const editTodo = (id, title) => {
      fetch([baseUrl, todopath, id].join("/"), {
        method: "PATCH",
        body: JSON.stringify({
          title: title,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    };
  
    const statusChange = (id, status) => {
      fetch([baseUrl, todopath, id].join("/"), {
        method: "PATCH",
        body: JSON.stringify({
          completed: status,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    };
  
    return {
      getTodos,
      deleteTodo,
      addTodo,
      editTodo,
      statusChange,
    };
  })();
  
  
  

  // * ~~~~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~~~~
  const View = (() => {
    const domstr = {
      todocontainer: "#todolist_container",
      inputbox: ".todolist_input",
      addtoList: ".addtoListbtn",
      todotasks: "#todo-tasks",
      doneTasks: "#doneList",
      inputid: "#input",
    };
  
    const render = (ele, tmp) => {
      ele.innerHTML = tmp;
    };
    const createTmp = (newStatus, arr) => {
      let tmp = "";
      arr.forEach((todo) => {
        if (!newStatus[todo.id]) {
          switch (todo.completed) {
            case true:
            tmp += `<li>
            <button class="statusbtn" id="status${todo.id}">undo</button>
            <span>${todo.title}</span>
            <button class="updatebtn" id="update${todo.id}">Edit</button>
            <button class="deletebtn" id="${todo.id}">Delete</button>
            </li>`;
            break;
            case false:
            tmp += `
            <li>
            <span>${todo.title}</span>
            <button class="updatebtn" id="update${todo.id}">Edit</button>
            <button class="deletebtn" id="${todo.id}">Delete</button>
            <button class="statusbtn" id="status${todo.id}">done</button>
          </li>
                `;
          break; 
          }
        } else {
          if (todo.completed === false) {
            tmp += `
                  <li>
                    <input type="text" value="${todo.title}" id="input${todo.id}">
                    <button class="updatebtn" id="update${todo.id}">Edit</button>
                    <button class="deletebtn" id="${todo.id}">Delete</button>
                    <button class="statusbtn" id="status${todo.id}">done</button>
                  </li>
                `;
          } else if (todo.completed === true) {
            tmp += `
                <li>
                    <button class="statusbtn" id="status${todo.id}">undo</button>
                    <input type="text" value="${todo.title}" id="input${todo.id}">
                    <button class="updatebtn" id="update${todo.id}">Edit</button>
                    <button class="deletebtn" id="${todo.id}">Delete</button>
                </li>
                `;
          }
        }
      });
  
      return tmp;
    };
  
    return {
      render,
      createTmp,
      domstr,
      status,
    };
  })();
  
    const Model = ((api, view) => {
        const { getTodos, deleteTodo, addTodo, editTodo, statusChange } =
          api;
      
        class Todo {
          constructor(title) {
            this.title = title;
            this.completed = false;
          }
        }
      
        class State {
          #todolist = [];
          #pendingList = [];
          #completedList = [];
          #updateStatus = {};
      
          get todolist() {
            return this.#todolist;
          }
          set todolist(newtodolist) {
            this.#todolist = newtodolist;
      
            this.#completedList = newtodolist.filter((todo) => {
              return todo.completed === true;
            });
            this.#pendingList = newtodolist.filter((todo) => {
              return todo.completed === false;
            });
      
            const todotasks = document.querySelector(
              view.domstr.todotasks
            );
            const pendingTmp = view.createTmp(
              this.#updateStatus,
              this.#pendingList
            );
      
            const doneTasks = document.querySelector(
              view.domstr.doneTasks
            );
      
            const completedTmp = view.createTmp(
              this.#updateStatus,
              this.#completedList
            );

            view.render(todotasks, pendingTmp);
            view.render(doneTasks, completedTmp);
          }
      
          get updateStatus() {
            return this.#updateStatus;
          }
      
          set updateStatus(newObj) {
            this.#updateStatus = newObj;
          }
        }
      
        return {
          getTodos,
          deleteTodo,
          addTodo,
          editTodo,
          statusChange,
          State,
          Todo,
        };
      })(Api, View);
      
    // ___________________________________________________________________________
