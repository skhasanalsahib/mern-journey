import { useReducer } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import initialTodos from "./data/initialTodos";
import { todoReducer } from "./reducers/todoReducer";

function App() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  const handleChangeTodo = (todo) => {
    dispatch({
      type: "change",
      todo,
    });
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "delete",
      id,
    });
  };

  const handleAddTodo = (title) => {
    dispatch({
      type: "add",
      title,
    });
  };

  return (
    <div>
      <h1>Simple Todo App</h1>
      <AddTodo todos={todos} onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
