import React from "react";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  React.useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    await fetch("http://localhost:3001/todos/allTodo", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "OK") {
          setTodos(res.todos);
        }
      });
  };

  const addTodo = async () => {
    await fetch("http://localhost:3001/todos/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    })
      .then((res) => res.json())
      .then((res) => {
        setTodo("");
        res.status === "OK" && getTodos();
      });
  };

  const deleteTodo = async (todoID) => {
    await fetch(`http://localhost:3001/todos/deleteTodo/${todoID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => res.status === "OK" && getTodos());
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          To-Do App With Express MongoDB React
        </a>
      </nav>

      <main className="container">
        <div className="row d-flex flex-column">
          <div className="col my-3">
            <div className="input-group mb-3">
              <input
                value={todo}
                type="text"
                className="form-control"
                placeholder="To-Do 👌"
                onChange={(e) => setTodo(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  id="button-addon2"
                  onClick={() => addTodo()}
                >
                  Add To-Do
                </button>
              </div>
            </div>
          </div>
          <div className="col my-3">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">To-Do</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, i) => {
                  return (
                    <tr key={todo._id}>
                      <th scope="row">{i}</th>
                      <td> {todo.todo} </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => deleteTodo(todo._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
