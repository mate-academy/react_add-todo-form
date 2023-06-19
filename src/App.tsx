import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './Types/User';
import { ToDo } from './Types/ToDo';

import './App.scss';

import { TodoList } from './components/TodoList';

export function findUser(userId: number): User | null {
  return usersFromServer.find(user => (
    user.id === userId
  )) || null;
}

export const newToDos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [todos, setToDo] = useState(newToDos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = findUser(+selectedUser);
    const isTitleValid = title.trim();

    if (!isTitleValid) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (!user || !isTitleValid) {
      return;
    }

    const nextToDoId = (toDoList: ToDo[]) => (
      Math.max(...toDoList.map(todo => todo.id)) + 1
    );

    const newToDo: ToDo = {
      id: nextToDoId(todos),
      title,
      userId: user.id,
      completed: false,
      user,
    };

    setToDo([...todos, newToDo]);
    setTitle('');
    setSelectedUser('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              placeholder="Choose a user"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && (
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

      <TodoList todos={todos} />
    </div>
  );
};
