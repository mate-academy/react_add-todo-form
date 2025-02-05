import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/TODO';
import { User } from './types/USER';
import { TodoList } from './components/TodoList';

function findTodoUser(userId: number, users: User[]) {
  return users.find(user => userId === user.id) || null;
}

function newId(oldPost: Todo[]): number {
  return Math.max(...oldPost.map(post => post.id)) + 1;
}

const preparingTodos: Todo[] = todosFromServer.map(todo => {
  const user = findTodoUser(todo.userId, usersFromServer);

  return { ...todo, user };
});

const TITLE_VALIDATION = /[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s]/g;

export const App = () => {
  const [titleValue, setTitleValue] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const [selectedUser, setSelectedUser] = useState(0);
  const [errorUser, setErrorUser] = useState('');

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(preparingTodos);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.currentTarget.value.replace(TITLE_VALIDATION, '');

    setTitleValue(newTitle);
    setErrorTitle('');
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.currentTarget.value));
    setErrorUser('');
  };

  function addNewPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!titleValue) {
      setErrorTitle('Please enter a title');
    }

    if (!selectedUser) {
      setErrorUser('Please choose a user');
    }

    if (!titleValue || !selectedUser) {
      return;
    }

    setVisibleTodos(cur => [
      ...cur,
      {
        id: newId(cur),
        title: titleValue,
        userId: selectedUser,
        user: findTodoUser(selectedUser, usersFromServer),
      },
    ]);

    setTitleValue('');
    setSelectedUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addNewPost}>
        <div className="field">
          <label htmlFor="title"> Enter the title </label>
          <input
            id="title"
            type="text"
            value={titleValue}
            onChange={changeTitle}
            data-cy="titleInput"
            placeholder="Title"
          />
          {errorTitle && <span className="error">{errorTitle}</span>}
        </div>
        <div className="field">
          <label htmlFor="ChooseUser"> Select user </label>
          <select
            id="ChooseUser"
            data-cy="userSelect"
            value={selectedUser}
            onChange={changeUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
