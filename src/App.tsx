import React, { useCallback, useMemo, useState } from 'react';
import './App.scss';
import { debounce } from 'lodash';
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
  const [appliedQuery, setAppliedQuery] = useState('');

  const handleApplyQuery = useCallback(debounce(setAppliedQuery, 500), []);

  const lowerCaseQuery = appliedQuery.toLowerCase();

  const visibleTodos = useMemo(() => {
    return todos.filter(
      todo => todo.title.toLowerCase().includes(lowerCaseQuery),
    );
  }, [todos, lowerCaseQuery]);

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

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <input
        type="text"
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          handleApplyQuery(event.target.value);
        }}
      />

      <TodoForm onSubmit={addTodo} />

      <TodoList
        todos={visibleTodos}
        onTodoDelete={deleteTodo}
      />
    </div>
  );
};
