import { useContext, useState } from "react";
import TodosContext from "../contexts/TodosContext";

export default function TodoContent({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const { onChangeTodo } = useContext(TodosContext);

  return isEditing ? (
    <>
      <input
        type="text"
        value={todo.title}
        onChange={(e) => {
          onChangeTodo({
            id: todo.id,
            title: e.target.value,
            done: todo.done,
          });
        }}
      />
      <button
        onClick={() => {
          setIsEditing(false);
        }}
      >
        Save
      </button>
    </>
  ) : (
    <>
      {todo.title}
      <button
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Edit
      </button>
    </>
  );
}
