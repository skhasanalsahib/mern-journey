import { useContext } from "react";
import TodoContent from "./TodoContent";
import TodosContext from "../contexts/TodosContext";

export default function Todo({ todo }) {
  const { onChangeTodo, onDeleteTodo } = useContext(TodosContext);
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
      <TodoContent todo={todo} />
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
