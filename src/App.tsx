import React, { useCallback, useMemo, useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getUser, TodoForm } from './components/TodoForm';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [query, setQuery] = useState('');
  const [counter, setCounter] = useState(0);

  const lowerCaseQuery = query.toLowerCase().trim();

  // [1, 2, 3]
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    ));
  }, [todos, lowerCaseQuery]);

  // region Handlers
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

  // endregion
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <button
        type="button"
        onClick={() => setCounter((previousCounter) => previousCounter + 1)}
      >
        {`Click click! ${counter}`}
      </button>

      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />

      <TodoForm addTodo={addTodo} />

      <TodoList
        todos={visibleTodos}
        onTodoDelete={deleteTodo}
      />
    </div>
  );
};
