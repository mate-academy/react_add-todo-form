import { FormEvent, useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { TodoFullInfo } from './types/todoFullInfo';
import { getTodosInfo } from './helpers/getTodosInfo';
import { removeByPattern } from './helpers/removeByPattern';

const todosInfo = getTodosInfo();

export const App1 = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [todos, setTodos] = useState(todosInfo);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorSelectedUser, setErrorSelectedUser] = useState('');

  const changeUser = (name: string) => {
    if (name !== '') {
      setErrorSelectedUser('');
    }

    setSelectedUser(name);
  };

  const changeTitle = (newTitle: string) => {
    if (newTitle !== '') {
      setErrorTitle('');
    }

    const pattern = /[@^#$/%^&*()_+-\\{}[\]]/g;
    const patternedTitle = removeByPattern(newTitle, pattern);

    setTitle(patternedTitle);
  };

  const clearForm = () => {
    setTitle('');
    setSelectedUser('0');
  };

  const isValid = (): boolean => {
    let result = true;

    if (title === '') {
      setErrorTitle('Please enter a title');

      result = false;
    }

    if (selectedUser === '0') {
      setErrorSelectedUser('Please choose a user');

      result = false;
    }

    return result;
  };

  const submit = (event:FormEvent) => {
    event.preventDefault();

    if (!isValid()) {
      return;
    }

    const userInfo = usersFromServer
      .find(user => user.name === selectedUser);

    if (!userInfo) {
      throw new Error('User not found');
    }

    setTodos((prev) => {
      const maxId = Math.max(...prev.map(todo => todo.id));

      return [...prev, {
        id: maxId + 1,
        title,
        userId: userInfo.id,
        completed: false,
        user: userInfo,
      } as TodoFullInfo];
    });

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={(event) => submit(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={(event) => changeTitle(event.target.value)}
          />
          <span className="error">{errorTitle}</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => changeUser(event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>

          <span className="error">{errorSelectedUser}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
