import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';

import users from './api/users';
import todos from './api/todos';

const preparesTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) ?? null,
}));

const App: React.FC = () => {
  const [user, setSelectedUser] = useState('');
  const [todoses, setTodos] = useState([...preparesTodos]);
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleInputError = (event: string) => {
    if (event !== '') {
      setErrorTitle(false);
    } else {
      setErrorTitle(true);
    }
  };

  const handleSelectorError = (event: string) => {
    if (event !== '') {
      setErrorUser(false);
    } else {
      setErrorUser(true);
    }
  };

  const todoForm = () => {
    const todo = {
      id: todoses.length + 1,
      title,
      userId: 0,
      completed: false,
      user: users.find(men => men.name === user) ?? null,
    };

    setTodos([...todoses, todo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    if (!user) {
      setErrorUser(true);
    } else {
      setErrorUser(false);
    }

    if (title && user) {
      todoForm();
      setTitle('');
      setSelectedUser('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <div className="App-container">
        <form
          onSubmit={handleSubmit}
        >
          <div className="input-block">
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={(event) => {
                setTitle(event.target.value);
                handleInputError(event.target.value);
              }}
            />
            <span className="warning">{errorTitle && ('Please enter the title!')}</span>

            <select
              value={user}
              onChange={(event) => {
                setSelectedUser(event.target.value);
                handleSelectorError(event.target.value);
              }}
            >
              <option>Choose user</option>
              {users.map(person => (
                <option key={person.id}>{person.name}</option>
              ))}
            </select>
            <span className="warning">{errorUser && ('Please choose a user!')}</span>
          </div>
          <button
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
      <TodoList todoses={todoses} />
    </div>
  );
};

export default App;
