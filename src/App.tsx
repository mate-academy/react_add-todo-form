import React, { useState } from 'react';
import classNames from 'classnames';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

interface User {
  id: string,
  name: string,
  username: string,
  email: string,
}

interface ToDo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export const App = () => {
  const [newToDo, setNewToDo] = useState({
    title: '',
    user: '',
    clicked: false,
  });

  const todosCopy = [...todosFromServer];
  const copy = [...usersFromServer];

  const [toDoList, setToDoList] = useState(todosCopy);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const [eventTitle, eventUser]
      = event.currentTarget as unknown as HTMLInputElement[];
    const maxId = Math.max(...todosCopy.map(todo => +todo.id));
    const zeroUser = '0';

    if (eventUser.value === zeroUser) {
      setNewToDo(prevState => ({
        ...prevState,
        user: 'alarm',
      }));
    }

    if (eventTitle.value === '') {
      setNewToDo(prevState => ({
        ...prevState,
        clicked: true,
      }));
    }

    const post = {
      id: maxId + 1,
      title: eventTitle.value,
      completed: false,
      userId: +eventUser.value,
    };

    if (eventTitle.value !== '' && eventUser.value !== '0') {
      setToDoList([post, ...toDoList]);
      setNewToDo(prevState => ({
        ...prevState,
        title: '',
        user: '',
      }));
    }
  }

  function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setNewToDo({
      clicked: false,
      title: event.target.value.replace(/[^a-z0-9 ]/gi, ''),
      user: newToDo.user,
    });
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setNewToDo(prevState => ({
      ...prevState,
      title: newToDo.title,
      user: event.target.value === '0' ? '' : event.target.value,
    }));
  }

  function getUserUnfo(todo: ToDo) {
    const user: User = {
      id: '0',
      name: '',
      username: '',
      email: '',
    };
    const user2 = copy.find(user3 => user3.id === todo.userId) || user;

    return (
      <a className="UserInfo" href={`mailto: ${user2.email}`}>
        {user2.name}
      </a>
    );
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={(event) => submitHandler(event)}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={newToDo.title}
            placeholder="test"
            onChange={(event) => inputHandler(event)}
          />
          <span className={classNames('error', {
            'show-error': newToDo.clicked,
          })}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newToDo.user}
            onChange={(event) => handleSelect(event)}
          >
            <option value="0">Choose a user</option>
            {copy.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className={classNames('error', {
            'show-error': newToDo.user === 'alarm',
          })}
          >
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {toDoList.map(todo => {
          return (
            <article
              data-id={todo.id}
              className="TodoInfo TodoInfo--completed"
              key={todo.id}
            >
              <h2 className="TodoInfo__title">
                {todo.title}
              </h2>
              {getUserUnfo(todo)}
            </article>
          );
        })}
      </section>
    </div>
  );
};
