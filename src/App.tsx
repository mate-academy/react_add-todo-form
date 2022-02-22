import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const defaultUser = {
  id: 0,
  name: 'None',
  username: 'None',
  email: 'None',
  address: {
    street: 'None',
    suite: 'None',
    city: 'None',
    zipcode: 'None',
    geo: {
      lat: 'None',
      lng: 'None',
    },
  },
  phone: 'None',
  website: 'None',
  company: {
    name: 'None',
    catchPhrase: 'None',
    bs: 'None',
  },
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [newUser, setNewUser] = useState(defaultUser);
  const [isUserErrorVisible, setUserErrorVisibility] = useState(false);
  const [isTitleErrorVisible, setTitleErrorVisibility] = useState(false);

  const setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userToAdd = users.find(user => user.name === event.target.value);

    if (userToAdd) {
      setNewUser(userToAdd);
      setUserErrorVisibility(false);
    } else {
      setNewUser(defaultUser);
    }
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newUser === defaultUser) {
      setUserErrorVisibility(true);

      return;
    }

    if (title === '') {
      setTitleErrorVisibility(true);

      return;
    }

    preparedTodos.push({
      userId: newUser.id,
      id: preparedTodos.length + 1,
      title,
      completed: false,
      user: newUser,
    });

    setTitle('');
  };

  return (
    <div className="App">
      <h1>
        Add todo form
      </h1>

      <form
        onSubmit={(event) => submit(event)}
        className="App__form"
      >
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setTitleErrorVisibility(false);
          }}
          placeholder="Enter Title"
        />
        {isTitleErrorVisible && ('You should enter some title')}
        <select
          onChange={(event) => setUser(event)}
        >
          <option value={defaultUser.name} defaultChecked>Choose a user</option>
          {users.map(user => (
            <option value={user.name}>{user.name}</option>
          ))}
        </select>
        {isUserErrorVisible && ('You should choose a user')}
        <button
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
