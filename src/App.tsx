import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getNextId = (todos: Todo[]): number => {
  return Math.max(0, ...todos.map(todo => todo.id)) + 1;
};

// Enriquecer todos com o campo user
const enrichedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId)!,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(enrichedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (!userId) {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const cleanedTitle = title.replace(/[^a-zA-Z0-9а-яА-ЯёЁ\s]/g, '');

    const newTodo: Todo = {
      id: getNextId(todos),
      title: cleanedTitle,
      userId,
      completed: false,
      user: usersFromServer.find(user => user.id === userId)!,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter todo title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (titleError) {
                setTitleError('');
              }
            }}
            data-cy="titleInput"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            value={userId}
            onChange={e => {
              setUserId(+e.target.value);
              if (userError) {
                setUserError('');
              }
            }}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
