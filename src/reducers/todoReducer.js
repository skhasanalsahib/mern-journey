import getNextTodoId from "../utils/getNextTodoId";

export function todoReducer(draftTodos, action) {
  switch (action.type) {
    case "change":
      {
        const index = draftTodos.findIndex((t) => t.id === action.todo.id);
        draftTodos[index] = action.todo;
      }
      break;

    case "delete":
      return draftTodos.filter((todo) => todo.id !== action.id);

    case "add":
      draftTodos.push({
        id: getNextTodoId(draftTodos),
        title: action.title,
        done: false,
      });
      break;

    default:
      throw new Error("No matching actions");
  }
}
