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
  