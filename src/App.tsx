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

function newListWithUser(): TodoWithUser[] {
  return todosFromServer.map(todo => ({
    todo,
    user: getUserById(todo.userId),
  }));
}

export const App = () => {
  const [listWithUser, setListWithUser] =
    useState<TodoWithUser[]>(newListWithUser());
  const [title, setTitle] = useState('');
  const [choise, setChoice] = useState('0');

  const [titleError, setTitleError] = useState(false);
  const [choiseError, setChoiseError] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (choise === '0') {
      setChoiseError(true);
      isValid = false;
    } else {
      setChoiseError(false);
    }

    return isValid;
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const lastIndex =
      listWithUser.length > 0
        ? listWithUser[listWithUser.length - 1].todo.id + 1
        : 1;

    const personFromChoise = getUserById(+choise);

    const todoFromForm: Todo = {
      id: lastIndex,
      title: title,
      completed: false,
      userId: personFromChoise?.id,
    };

    const newItem: TodoWithUser = {
      user: personFromChoise,
      todo: todoFromForm,
    };

    setListWithUser(currentList => [...currentList, newItem]);
    setTitle('');
    setChoice('0');
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
            onChange={e => {
              setTitle(e.target.value);
              if (e.target.value.trim()) {
                setTitleError(false);
              }
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={choise}
            onChange={e => {
              setChoice(e.target.value);
              if (e.target.value !== '0') {
                setChoiseError(false);
              }
            }}
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
