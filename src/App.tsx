import React, { useCallback, useMemo, useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getUser, TodoForm } from './components/TodoForm';

// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(f: Function, delay: number) {
  let timerId = 0;

  return (...args: any[]) => {
    if (timerId) {
      window.clearInterval(timerId);
    }

    timerId = setTimeout(f, delay, ...args);
  };
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }));
  });

  const [count, setCount] = useState(0);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const apply = useMemo(() => {
    return debounce(setAppliedQuery, 1000);
  }, []);

  const addTodo = (todoData: Omit<Todo, 'id'>) => {
    const newTodo = {
      ...todoData,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  }, []);

  const updateTodo = useCallback((updatedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(
      todo => (todo.id === updatedTodo.id ? updatedTodo : todo),
    ));
  }, []);

  const lowerQuery = appliedQuery.toLocaleLowerCase();
  const visibleTodos = useMemo(() => {
    return todos.filter(
      todo => todo.title.toLocaleLowerCase().includes(lowerQuery),
    );
  }, [lowerQuery]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <button type="button" onClick={() => setCount(x => x + 1)}>
        {count}
      </button>

      <input
        type="text"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          apply(e.target.value);
        }}
      />

      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={visibleTodos}
        onTodoDelete={deleteTodo}
        onTodoUpdate={updateTodo}
      />
    </div>
  );
};
