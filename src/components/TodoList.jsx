import Todo from "./Todo";

export default function TodoList({ todos, onChangeTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Todo
            todo={todo}
            onChangeTodo={onChangeTodo}
            onDeleteTodo={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}
