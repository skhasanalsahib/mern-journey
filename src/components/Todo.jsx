import { useState } from "react";

export default function Todo({ todo, onChangeTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);

  const todoContent = isEditing ? (
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

  return (
    <>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => {
          onChangeTodo({
            id: todo.id,
            title: todo.title,
            done: e.target.checked,
          });
        }}
      />{" "}
      {/*COntroled Component */}
      {todoContent}
      <button
        onClick={() => {
          onDeleteTodo(todo.id);
        }}
      >
        Delete
      </button>
    </>
  );
}
