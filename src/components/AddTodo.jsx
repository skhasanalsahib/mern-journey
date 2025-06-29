import { useContext, useState } from "react";
import TodosContext, { useTodo } from "../contexts/TodosContext";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const { onAddTodo } = useTodo();

  return (
    <>
      <input
        type="text"
        placeholder="Add task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => {
          onAddTodo(title);
          setTitle("");
        }}
      >
        Add
      </button>
    </>
  );
}
