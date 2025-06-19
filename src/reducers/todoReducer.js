import getNextTodoId from "../utils/getNextTodoId";

export function todoReducer(todos, action) {
  switch (action.type) {
    case "change":
      return todos.map((t) => {
        if (t.id === action.todo.id) {
          return {
            ...t,
            title: action.todo.title,
            done: action.todo.done,
          };
        }
        return t;
      });

    case "delete":
      return todos.filter((todo) => todo.id !== action.id);

    case "add":
      return [
        ...todos,
        {
          id: getNextTodoId(todos),
          title: action.title,
          done: false,
        },
      ];

    default:
      throw new Error("No matching actions");
  }
}
