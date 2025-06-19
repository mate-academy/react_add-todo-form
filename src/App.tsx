import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
// import { use } from 'chai';

export const App = () => {
  const [users] = useState(usersFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [todoList, setTodoList] = useState(todosFromServer);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [userSelectionErrorMessage, setUserSelectionErrorMessage] =
    useState('');

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleErrorMessage('');
    setUserSelectionErrorMessage('');

    if (title.trim() === '') {
      setTitleErrorMessage('Please enter a title');

      return;
    }

    if (selectedUserId === null) {
      setUserSelectionErrorMessage('Please choose a user');

      return;
    }

    const userObject = users.find(user => user.id === Number(selectedUserId));

    if (!userObject) {
      setUserSelectionErrorMessage('Please choose a valid user');

      return;
    }

    const maxId = todoList.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0,
    );

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId: Number(selectedUserId),
      completed: false,
      user: userObject,
    };

    setTodoList([...todoList, newTodo]);

    setTitle('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo} action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={newTitle => setTitle(newTitle.target.value)}
          />
          {titleErrorMessage && (
            <span className="error">{titleErrorMessage}</span>
          )}{' '}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId ?? ''}
            onChange={newSelectedUserId =>
              setSelectedUserId(Number(newSelectedUserId.target.value))
            }
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userSelectionErrorMessage && (
            <span className="error">{userSelectionErrorMessage}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todoList.map(todo => {
          const userForTodo = users.find(user => user.id === todo.userId);

          return (
            <article
              key={todo.id}
              data-id={todo.id}
              className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
            >
              <h2 className="TodoInfo__title">{todo.title}</h2>
              {userForTodo && (
                <a className="UserInfo" href={`mailto:${userForTodo.email}`}>
                  {userForTodo.name}
                </a>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
};
