import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import getNextTodoId from "./utils/getNextTodoId";
import initialTodos from "./data/initialTodos";

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const handleChangeTodo = (todo) => {
    const changedTodos = todos.map((t) => {
      if (todo.id === t.id) {
        return {
          ...t,
          title: todo.title,
          done: todo.done,
        };
      }
      return t;
    });

    setTodos(changedTodos);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = (title) => {
    setTodos([
      ...todos,
      {
        id: getNextTodoId(todos),
        title,
        done: false,
      },
    ]);
  };

  return (
    <div>
      <h1>Simple Todo App</h1>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
