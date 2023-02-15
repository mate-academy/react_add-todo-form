import React, { useCallback, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import todosFromServer from '../../api/todos';
import { getUserById } from '../../utils/getUserById';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

type ContextType = {
  todos: Todo[],
  addTodo: (todo: Todo) => void,
  deleteTodo: (todoId: number) => void,
};

export const TodosContext = React.createContext<ContextType>({
  todos: initialTodos,
  addTodo: () => {},
  deleteTodo: () => {},
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = useCallback((todo: Todo) => {
    setTodos((currentTodos) => ([
      ...currentTodos, todo,
    ]));
  }, []);

  const deleteTodo = useCallback((todoId: number) => {
    setTodos((currentTodos) => (
      currentTodos.filter(todo => todo.id !== todoId)
    ));
  }, []);

  const contextValue = useMemo(() => {
    return {
      todos,
      addTodo,
      deleteTodo,
    };
  }, [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
