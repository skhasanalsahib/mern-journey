import { useEffect, useState } from "react";
import TodoContent from "./components/TodoContent";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [todos, setTodos] = useState([]);
  const [addInput, setAddInput] = useState("");

  const fetchAllTodos = () => {
    fetch(`http://localhost:3000/todos`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  // notify added todo
  const addedToast = () => toast("Task Added");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (addInput.trim() === "") {
      return;
    }
    fetch(`http://localhost:3000/todos`, {
      method: "POST",
      body: JSON.stringify({ title: addInput, isComplete: false }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => setAddInput(""))
      .then(() => addedToast())
      .then(() => fetchAllTodos());
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => fetchAllTodos());
  };

  return (
    <>
      <h1>Todo using useEffect</h1>
      <form>
        <input
          type="text"
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleAddTodo(e)}>
          Add
        </button>
        <ToastContainer />
      </form>
      <hr />

      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <TodoContent
              todo={todo}
              fetchAllTodos={fetchAllTodos}
              onDeleteTodo={handleDeleteTodo}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
