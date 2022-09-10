// // consume todo data from api
// const Api2 = (() => {
//     // const baseUrl = "https://jsonplaceholder.typicode.com";
//     const baseUrl = "http://localhost:3000"
//     const todopath = "todos";
// // get todos
//     const getTodos = () => 
//     fetch([baseUrl, todopath].join("/")).then((resp) => 
//     resp.json());

// // delete todos
//     const deleteTodo = (id) =>
//     fetch([baseUrl, todopath, id].join("/"), {
//         method: "DELETE",
//     });

//     const addTodo = (todo) =>
//     fetch([baseUrl, todopath].join("/"), {
//     method: 'POST',
//     body: JSON.stringify(todo),
//     headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// }).then((response) => response.json());

//     const editTodo = (newTitle, id) =>
//     fetch([baseUrl, todopath, id].join("/"), {
//         method: 'PUT',
//   body: JSON.stringify({
//     title: newTitle,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
//     });

// return {
//     getTodos,
//     deleteTodo,
//     addTodo,
//     editTodo
// };
// })();

// // display to do lists with a close list option
// const View2 = (() => {
//     const domstr = {
//         todocontainer : '#completed_list',
//         // inputbox : '.todolist__input',
//         addbtn : '.addbtn',
//         editbtn: '.editbtn'
//     };

//     const render = (ele, tmp) => {
//         ele.innerHTML = tmp
//     }

//     const createTmpComp = (arr) => {
//         let tmp = ""
//         arr.forEach(todo => { if(todo.completed === true)
//             tmp += `
//             <li>
//                 <span contenteditable="false" id="todo${todo.id}">${todo.id}-${todo.title}</span>
//                 <button class="editbtn" id="${todo.id}">edit</button>
//                 <button class="deletebtn" id="${todo.id}">X</button>
//                 <button class="completed" id="comp${todo.id}">comp</button>
//             </li>`;
//         });
//         return tmp
//     };


//     return {
// 		render,
// 		createTmp,
// 		domstr,
// 	};
// })();
// // Model, consumes the data from Api and works on the logic in interaction with View
// const model2 = ((api, View) => {
// const { getTodos, deleteTodo, editTodo } = api;

// class Todo {
//     constructor(title){
//         // this.userId = 2;
// 		this.completed = false;
// 		this.title = title;
//     }
// }

// class State {
//         #todolist = [];

//         get todolist() {
//             return this.#todolist
//         }

//         set todolist(newtodolist){
//             this.#todolist = newtodolist;

//             const todocontainer = document.querySelector(View.domstr.todocontainer);

//             const tmp = View.createTmp(this.#todolist);
//             View.render(todocontainer, tmp);
//         }
// }
// return {
//     getTodos,
//     deleteTodo,
//     editTodo,
//     State,
//     Todo
// };
// })(Api2, View2);
// // This is the controller this is where we implements model related to interaction with user
// // on click, the close button deletes the todolist from list
// // add new todo using the input, on change and 'enter' keyup

// const controller2 = ((model, View) => {
// const state = new model.State();

// const deleteTodo = () => {
//     const todocontainer = document.querySelector(
//         View.domstr.todocontainer
//     );
//     todocontainer.addEventListener("click", (event) => {
//         if (event.target.className === "deletebtn") {
//             state.todolist = state.todolist.filter(
//                 (todo) => +todo.id !== +event.target.id
//             );
//             model.deleteTodo(event.target.id);
//         }
//     });
// };
// // const addTodo = () => {
// //     const inputbox = document.querySelector(View.domstr.inputbox);
// //     const addbtn = document.querySelector(View.domstr.addbtn);
// //     addbtn.addEventListener("click", (event) => {
// //         if (inputbox.value.trim() !== '') {
// //             const todo = new model.Todo(inputbox.value);
// //     model.addTodo(todo).then(todofromBE => {
// //       console.log(todofromBE);
// //       state.todolist = [todofromBE, ...state.todolist];
// //     });
// //     inputbox.value = '';
// //         }
// //     });
// // };

// const editTodo = () => {
//     const todocontainer = document.querySelector(
//         View.domstr.todocontainer
//     );
    
//     todocontainer.addEventListener("click", (event) => {
//         const editableContent = document.getElementById(`todo${event.target.id}`)
//         if(event.target.className === 'editbtn'){
//         editableContent.contentEditable = true;
        
//         editableContent.addEventListener("keyup", (event) => {
//             if (event.key === "Enter"){
//                 let arg = editableContent.innerHTML.replace("<br>", "")
                
//         model.editTodo(arg, event.target.id);
        
//         }
            
//         });
//             console.log(editableContent)
//     }
//     })

// }

// const init = () => {
//     model.getTodos().then((todos) => {
//         state.todolist = todos.reverse();
//     });
// }

// const bootstrap = () => {
//     init();
//     deleteTodo();
//     addTodo();
//     editTodo();
// }; 
// return { bootstrap };
// })(model,View);

// controller.bootstrap();