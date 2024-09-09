import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

import { User } from './services/User';
import { Todo } from './services/Todo';
import { TodoWithUser } from './services/TodoWithUser';

function getUserById(id: number): User | undefined {
  return usersFromServer.find(user => user.id === id);
}

function getTodosWithUser(): TodoWithUser[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
}

export const App = () => {
  const [listWithUser, setListWithUser] =
    useState<TodoWithUser[]>(getTodosWithUser());
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');

  const [titleError, setTitleError] = useState(false);
  const [choiseError, setUserIdError] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (userId === '0') {
      setUserIdError(true);
      isValid = false;
    } else {
      setUserIdError(false);
    }

    return isValid;
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const maxIndex = Math.max(...listWithUser.map(el => el.id));

    const personFromChoise = getUserById(+userId);

    const todoFromForm: Todo = {
      id: maxIndex + 1,
      title: title,
      completed: false,
      userId: personFromChoise?.id,
    };

    const newItem: TodoWithUser = {
      ...todoFromForm,
      user: personFromChoise,
    };

    setListWithUser(currentList => [...currentList, newItem]);
    setTitle('');
    setUserId('0');
  };

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    if (e.currentTarget.value.trim()) {
      setTitleError(false);
    }
  };

  const handleUserIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
    if (e.currentTarget.value !== '0') {
      setUserIdError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submitHandler}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
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

          {choiseError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" className="button is-link">
          Add
        </button>
      </form>

      <TodoList todos={listWithUser} />
    </div>
  );
};
