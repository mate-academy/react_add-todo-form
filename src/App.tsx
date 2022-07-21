import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [selectError, setSelectError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [changebleTodos, addNewTodo] = useState(todos);

  const maxId = Math.max(...changebleTodos.map(todo => todo.id));

  const currentUser = users.find(user => user.name === userName);
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const checkForbidenSymbols = (str: string) => (
    str.split('')
      .filter(char => !'!@#$%^&*()_-+=";:/?|.,><}{][~\\`\''.includes(char))
      .join('')
  );

  const reset = () => {
    setUserName('');
    setTitle('');
  };

  const actualTodos = changebleTodos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));

  const handleChange = () => {
    if (currentUser && title) {
      addNewTodo([...actualTodos, {
        userId: currentUser.id,
        id: maxId + 1,
        title,
        completed: false,
      }]);
      reset();
    }

    if (!title) {
      setTitleError(true);
    }

    if (!userName) {
      setSelectError(true);
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form onSubmit={handleSubmit} className="App__form">
        <input
          type="text"
          name="title"
          className="input App__input"
          data-cy="titleInput"
          value={title}
          placeholder="Enter the title, please"
          onChange={({ target }) => {
            setTitle(checkForbidenSymbols(target.value));
            setTitleError(false);
          }}
        />

        {/* Permanent container is needed for styling */}
        <div className="App__error-container">
          {titleError && (
            <p className="App__error App__error--title">
              Please enter the title
            </p>
          )}
        </div>

        <select
          name="users"
          className="select"
          data-cy="userSelect"
          value={userName}
          onChange={({ target }) => {
            setUserName(target.value);
            setSelectError(false);
          }}
        >
          <option
            value=""
            disabled
          >
            Choose a name
          </option>

          {users.map((user) => (
            <option
              key={user.id}
              value={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>

        {/* Permanent container is needed for styling */}
        <div className="App__error-container">
          {selectError && (
            <p className="App__error">Please choose a user</p>
          )}
        </div>

        <button
          type="submit"
          className="button is-primary"
          onClick={handleChange}
        >
          Add
        </button>
      </form>

      <p className="App__task-counter">
        <span>Tasks to do left: </span>
        {changebleTodos.length}
      </p>
      <TodoList todos={actualTodos} />
    </div>
  );
};

export default App;
