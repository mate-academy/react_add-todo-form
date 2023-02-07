import './App.scss';
import React, { ChangeEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  return usersFromServer.find(person => person.id === userId) || null;
}

const updatedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(updatedTodos);

  const getNewTodo = () => {
    return ({
      id: new Date().getTime(),
      title,
      completed: false,
      userId: +userId,
      user: getUserById(+userId),
    });
  };

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = usersFromServer
      .find(user => user.name === userId) || null;

    if (!currentUser) {
      setUserError(!userId);
    }

    if (title.length === 0) {
      setTitleError(!title);
    }

    if (title && userId) {
      const todo = getNewTodo();

      setVisibleTodos([...visibleTodos, todo]);
      setTitle('');
      setUserId('');
    }
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUserId(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTodo}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleChangeTitle}
              placeholder="Enter a title"
            />
          </label>
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleChangeUser}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={visibleTodos} />
      </section>
    </div>
  );
};
