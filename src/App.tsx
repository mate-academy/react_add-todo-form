/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodo = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => (user.id === todo.userId)) || null,
  };
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUser] = useState(0);
  const [uncorrectSelect, setUncorrectSelect] = useState('');
  const [uncorrectTitle, setUncorrectTitle] = useState('');
  const [createdTodo, addToCreatedTodo] = useState(preparedTodo);

  const getMaxId = () => {
    let maxId = 0;

    createdTodo.forEach(todo => {
      if (todo.id > maxId) {
        maxId = todo.id;
      }
    });

    return maxId;
  };

  const addTodo = () => {
    let isValid = true;

    if (title.trim() === '') {
      setUncorrectTitle('Please enter the title');
      isValid = false;
    } else {
      let str = title;

      str = str.replace(/[^a-zA-Z0-9А-ЩЬЮЯҐЄІЇЁа-щьюяґєіїё ]/g, '');

      if (str.length < title.length) {
        setUncorrectTitle('Please enter correct title(p.s. Allow entering letters (`ru` and `en`), digits and `spaces`)');
        isValid = false;
      } else {
        setUncorrectTitle('');
      }
    }

    if (selectedUserId === 0) {
      setUncorrectSelect('Please choose a user');
      isValid = false;
    } else {
      setUncorrectSelect('');
    }

    if (isValid) {
      const newUser = {
        id: getMaxId() + 1,
        title,
        completed: false,
        user: users.find(user => (user.id === selectedUserId)) || null,
        userId: selectedUserId,
      };

      addToCreatedTodo(current => ([...current, newUser]));

      setSelectedUser(-1);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h2>Add User</h2>
      <form
        className="App__form"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <label htmlFor="title">
          {'Title '}
        </label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          className="App__input"
          onChange={(event) => {
            setTitle(event.target.value);
            setUncorrectTitle('');
          }}
        />
        <br />
        <span className="App__error">{uncorrectTitle}</span>
        <br />
        <label htmlFor="title">
          {'Select User '}
        </label>
        <select
          className="App__input"
          value={selectedUserId}
          onChange={(event) => {
            setSelectedUser(+event.target.value);
            setUncorrectSelect('');
          }}
        >
          <option value="0">Choose user ...</option>
          {users.map(user => (
            <option key={user.name} value={user.id}>{user.name}</option>
          ))}
        </select>
        <br />
        <span className="App__error">{uncorrectSelect}</span>
        <br />
        <button type="submit" className="App__button">Add</button>
      </form>
      <h1>Static list of todos</h1>
      <TodoList todoList={createdTodo} />
    </div>
  );
};

export default App;
