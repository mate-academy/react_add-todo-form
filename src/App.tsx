import { useState } from 'react';
import cn from 'classnames';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [currentTodos, setCurrentTodos] = useState(todosFromServer);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const addTodo = () => {
    const todosId: number[] = currentTodos.map(todo => todo.id);

    const newTodo: Todo = {
      title,
      userId: selectedUserId,
      completed: false,
      id: Math.max(...todosId) + 1,
    };

    setCurrentTodos([...currentTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setIsEmpty(false);
    }

    if (!selectedUserId) {
      setIsUserSelected(false);
    }

    if (!title || !selectedUserId) {
      return;
    }

    addTodo();
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title..."
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
          <span
            className={cn('error', { disabled: isEmpty })}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            onChange={event => {
              setSelectedUserId(+event.target.value);
            }}
            value={selectedUserId}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <span
            className={cn('error', { disabled: isUserSelected })}
          >
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
