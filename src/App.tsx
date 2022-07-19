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
  const [changebleTodos, addNewTodo] = useState(todos);

  const findMaxId = () => {
    let currentId = changebleTodos[0].id;

    for (let i = 1; i < changebleTodos.length; i += 1) {
      if (changebleTodos[i].id > currentId) {
        currentId = changebleTodos[i].id;
      }
    }

    return currentId;
  };

  const currentUser = users.find(user => user.name === userName);
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const reset = () => {
    setUserName('');
    setTitle('');
  };

  const actualTodos = changebleTodos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));

  const throwError = (
    value:string,
    func: (value: React.SetStateAction<string>) => void,
    errorPhrase:string,
  ) => {
    if (value.length === 0) {
      func(errorPhrase);
    } else {
      func('');
    }
  };

  const handleChange = () => {
    if (currentUser && title) {
      addNewTodo([...actualTodos, {
        userId: currentUser.id,
        id: findMaxId() + 1,
        title,
        completed: false,
      }]);
    }

    throwError(title, setTitleError, 'Please enter the title');
    throwError(userName, setSelectError, 'Please choose a user');

    if (userName && title) {
      reset();
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
          value={title}
          placeholder="Enter the title, please"
          onChange={({ target }) => (
            setTitle(target.value.split('')
              .filter(char => !'!@#$%^&*()_-+=";:/?|.,><}{][~'.includes(char))
              .join(''))
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
        <span>Tasks to do left: </span>
        {changebleTodos.length}
      </p>
      <TodoList todos={actualTodos} />
    </div>
  );
};

export default App;
