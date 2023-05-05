import {
  createContext, FC, useCallback, useMemo, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import todosFromServer from '../../api/todos';
import { getUser } from '../TodoForm';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

interface TodosContextValue {
  todos: Todo[];
  addTodo: (todoData: Omit<Todo, 'id'>) => void;
  deleteTodo: (todoId: number) => void;
}

export const TodosContext = createContext<TodosContextValue>({
  todos: initialTodos,
  addTodo: (todoData: Omit<Todo, 'id'>) => { /* empty */
  },
  deleteTodo: (todoId: number) => { /* empty */
  },
});

export const TodosProvider: FC = ({ children }) => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = useCallback((todoData: Omit<Todo, 'id'>) => {
    const newTodo = {
      ...todoData,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  }, []);

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  }, []);

  const contextValue: TodosContextValue = useMemo(() => {
    return {
      todos,
      addTodo,
      deleteTodo,
    };
  }, [todos, addTodo, deleteTodo]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
