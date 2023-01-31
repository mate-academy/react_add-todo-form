import React, {
  useCallback, useState, createContext, useMemo,
} from 'react';
import { TodoWithUser } from '../../react-app-env';
import { getTodoId } from '../../utils/getTodoId';
import { getUserById } from '../../utils/getUserById';
import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

type ContextType = {
  todos: TodoWithUser[],
  addTodo: (todoTitle: string, todoUserId: number) => void,
  deleteTodo: (todoId: number) => void,
};

export const TodosContext = createContext<ContextType>({
  todos: todosWithUser,
  addTodo: () => {},
  deleteTodo: () => {},
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);

  const addNewTodo = useCallback((todoTitle: string, todoUserId: number) => {
    setTodos(currentTodos => {
      const newTodo: TodoWithUser = {
        id: getTodoId(currentTodos),
        title: todoTitle,
        completed: false,
        userId: todoUserId,
        user: getUserById(todoUserId, usersFromServer),
      };

      return [...currentTodos, newTodo];
    });
  }, []);

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  }, []);

  const contextValue = useMemo(() => {
    return {
      todos,
      addTodo: addNewTodo,
      deleteTodo,
    };
  }, [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
