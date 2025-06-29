import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";
import initialTodos from "../data/initialTodos";
import { todoReducer } from "../reducers/todoReducer";

const TodosContext = createContext(null);
export default TodosContext;

export const TodosContextProvider = ({ children }) => {
  const [todos, dispatch] = useImmerReducer(todoReducer, initialTodos);

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
    <TodosContext
      value={{
        todos,
        onChangeTodo: handleChangeTodo,
        onDeleteTodo: handleDeleteTodo,
        onAddTodo: handleAddTodo,
      }}
    >
      {children}
    </TodosContext>
  );
};

export function useTodo() {
  return useContext(TodosContext);
}
