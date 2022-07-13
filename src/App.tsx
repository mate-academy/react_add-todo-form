import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [selectError, setSelectError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [changelbeTodo, addNewTodo] = useState(todos);

  const currentUser = users.find(user => user.name === userName);
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const reset = () => {
    if (userName) {
      setUserName('');
    }

    if (title) {
      setTitle('');
    }
  };

  const test = changelbeTodo.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));

  const handleChange = () => {
    if (currentUser && title) {
      addNewTodo([...test, {
        userId: currentUser.id,
        id: changelbeTodo.length + 1,
        title,
        completed: false,
      }]);
    }

    if (title.length === 0) {
      setTitleError('Please enter the title');
    } else {
      setTitleError('');
    }

    if (userName.length === 0) {
      setSelectError('Please choose a user');
    } else {
      setSelectError('');
    }

    reset();
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form onSubmit={handleSubmit} className="App__form">
        <input
          type="text"
          name="title"
          className="input App__input"
          value={title}
          placeholder="Enter the title, please"
          onChange={({ target }) => (
            setTitle(target.value)
          )}
        />
        <div className="App__error-container">
          <p className="App__error App__error--title">{titleError}</p>
        </div>
        <select
          name="users"
          className="select"
          value={userName}
          onChange={({ target }) => (
            setUserName(target.value)
          )}
        >
          <option
            value=""
            disabled
          >
            Choose a name
          </option>
          {[...new Array(users.length)].map((_, i) => (
            <option
              key={users[i].id}
              value={users[i].name}
            >
              {users[i].name}
            </option>
          ))}
        </select>
        <div className="App__error-container">
          <p className="App__error">{selectError}</p>
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
        <span>Tasks left to do: </span>
        {changelbeTodo.length}
      </p>
      <TodoList todos={test} />
    </div>
  );
};

export default App;
