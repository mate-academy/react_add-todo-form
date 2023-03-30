import React, { useEffect, useState } from 'react';
import './App.scss';

import { User } from './types/User';
import { FullTodo } from './types/FullTodo';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUsers: FullTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<FullTodo[]>(todosWithUsers);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setNewUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const getMaxId = (todosArray: FullTodo[]): number => {
    const copy = [...todosArray].sort((prev, curr) => curr.id - prev.id);

    return copy[0].id + 1;
  };

  const addNewTodo = (title: string, userId: number) => {
    const newTodo: FullTodo = {
      id: getMaxId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(selectedUserId),
    };

    setTodos([...todos, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTitle && selectedUserId) {
      addNewTodo(newTitle, selectedUserId);
      setNewTitle('');
      setNewUserId(0);
    }
  };

  useEffect(() => {
    setHasTitleError(!newTitle);
  }, [newTitle]);

  useEffect(() => {
    setHasUserError(!selectedUserId);
  }, [selectedUserId]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        name="form"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="New title"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
          />
          {
            hasTitleError && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => setNewUserId(Number(event.target.value))}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {
            hasUserError && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
