/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.scss';

import { ToDoList } from './components/ToDoList';
import { ToDo } from './types/ToDo';

import users from './api/users';
import todos from './api/todos';

const list: ToDo[] = todos.map((toDo: Omit<ToDo, 'user'>) => ({
  ...toDo,
  user: users.find(user => {
    return user.id === toDo.userId;
  }),
}
));

const App: React.FC = () => {
  const [visibleList, setVisibleList] = useState(list);
  const [responsible, setResponsible] = useState('');
  const [title, setTitle] = useState('');

  const [isSelectErrorvisible, setSelectErrorvisibility] = useState(false);
  const [isTitleErrorvisible, setTitleErrorvisibility] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const attachToDo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    console.log('true');

    if (!title.trim()) {
      setTitleErrorvisibility(true);
      setTitle('');

      return;
    }

    setTitleErrorvisibility(false);

    if (!responsible) {
      setSelectErrorvisibility(true);

      return;
    }

    setSelectErrorvisibility(false);

    const stateUser = users.find(user => {
      return user.name === responsible;
    });

    const newToDo: ToDo = {
      userId: stateUser?.id,
      id: visibleList.length + 1,
      user: stateUser,
      title,
      completed: false,
    };

    setVisibleList([
      ...visibleList,
      newToDo,
    ]);

    setResponsible('');
    setTitle('');
    setSubmitted(false);
  };

  return (
    <div className="App">
      <ToDoList list={visibleList} />

      <form
        onSubmit={attachToDo}
        className="form"
      >
        <h1 className="form__title">
          Add todo form
        </h1>

        <p className="form__counter">
          <span>Users: </span>
          {users.length}
        </p>

        <label className="form__label">
          Task name:
          <input
            name="title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle((currentValue) => {
                if (isSubmitted) {
                  if (event.target.value.length > 0) {
                    setTitleErrorvisibility(false);
                  } else {
                    setTitleErrorvisibility(true);
                  }
                }

                const char = event.target.value[event.target.value.length - 1];

                if (char === undefined) {
                  return '';
                }

                if (!char.match(/[A-Za-zА-Яа-я0-9 ]/g)) {
                  return currentValue;
                }

                return event.target.value;
              });
            }}
            className="form__input"
          />

          {isTitleErrorvisible && (
            <p className="form__error">
              * Please enter the title
            </p>
          )}
        </label>

        <label className="form__label">
          Select responsible person:
          <select
            name="user"
            value={responsible}
            onChange={(event) => {
              if (isSubmitted) {
                if (event.target.value.length > 0) {
                  setSelectErrorvisibility(false);
                } else {
                  setSelectErrorvisibility(true);
                }
              }

              setResponsible(event.target.value);
            }}
            className="form__select"
          >
            <option value="">
              Choose a user
            </option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isSelectErrorvisible && (
            <p className="form__error">
              * Please choose a user
            </p>
          )}
        </label>

        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
