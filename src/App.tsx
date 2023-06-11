import './App.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [newToDo, setNewToDo] = useState({
    title: '',
    user: '',
  });
  const todosCopy = [...todosFromServer];
  const copy = [...usersFromServer];

  const [toDoList, setToDoList] = useState(todosCopy);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const maxId = Math.max(...todosCopy.map(todo => +todo.id));
    const eventUser = (event.currentTarget[1] as HTMLInputElement).value;
    const eventTitle = (event.currentTarget[0] as HTMLInputElement).value;

    if (eventUser === '0') {
      setNewToDo(prevState => ({
        title: prevState.title,
        user: 'alarm',
      }));
      setTimeout(() => setNewToDo(prevState => ({
        title: prevState.title,
        user: '',
      })), 1000);
    } else if (eventTitle === '') {
      setNewToDo(prevState => ({
        title: 'test',
        user: prevState.user,
      }));
      setTimeout(() => setNewToDo(prevState => ({
        title: '',
        user: prevState.user,
      })), 1000);
    }

    const post = {
      id: maxId + 1,
      title: eventTitle,
      completed: false,
      userId: +eventUser,
    };

    if (eventTitle !== '' && eventUser !== '0') {
      setToDoList([post, ...toDoList]);
      setNewToDo({
        title: '',
        user: '',
      });
    }
  }

  function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setNewToDo({
      title: event.target.value.replace(/[^a-z0-9 ]/gi, ''),
      user: newToDo.user,
    });
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setNewToDo({
      title: newToDo.title,
      user: event.target.value === '0' ? '' : event.target.value,
    });
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
            'show-error': newToDo.title === '',
            'show-error alarm': newToDo.title === 'test',
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
            {copy.map((user) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          <span className={classNames('error', {
            'show-error': newToDo.user === '',
            'show-error alarm': newToDo.user === 'alarm',
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
            >
              <h2 className="TodoInfo__title">
                {todo.title}
              </h2>

              <a className="UserInfo" href="mailto:Sincere@april.biz">
                {copy.find(user => user.id === todo.userId)?.name}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};
