import { useState } from "react";

export default function TodoContent({ todo, fetchAllTodos, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleComplete = (id, isComplete) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isComplete: !isComplete }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => fetchAllTodos());
  };

  // const handleIsEditing = (e) => {
  //   fetch(`http://localhost:3000/todos`, {
  //     method: "POST",
  //     body: JSON.stringify({ title: e.target.value, isComplete: false }),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   }).then(() => fetchAllTodos());
  //   setIsEditing(false);
  // };

  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim() === todo.title.trim()) {
      setIsEditing(false);
      return;
    }
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: editTitle }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      fetchAllTodos();
      setIsEditing(false);
    });
  };

  return isEditing ? (
    <>
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </>
  ) : (
    <>
      <input
        type="checkbox"
        checked={todo.isComplete}
        onChange={() => handleComplete(todo.id, todo.isComplete)}
      />
      {todo.title}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
    </>
  );
}
