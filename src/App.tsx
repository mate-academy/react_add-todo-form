import React, { useState } from 'react';
import TodoList from './Components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

import './App.scss';

const prepared = todos.map(todo => {
  return {
    ...todo,
    user: users.find(elementUser => elementUser.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [preparedTodos, setPreparedTodo] = useState(prepared);

  const setNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const setNewUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserIdError(false);
  };

  const addNewTodo = () => {
    if (title === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserIdError(true);
    }

    if (title !== '' && userId !== 0) {
      const newTodo = {
        userId,
        id: preparedTodos.length + 1,
        title,
        completed: false,
        user: users.find(elementUser => elementUser.id === userId) || null,
      };

      setPreparedTodo((currentTodos) => [...currentTodos, newTodo]);
      setUserId(0);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <div className="app__container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addNewTodo();
          }}
        >
          <div className="app__input input">
            <input
              className="input__field"
              type="text"
              value={title}
              placeholder="Title"
              onChange={setNewTitle}
            />
            {titleError && (
              <span className="input__error">
                Please enter the title
              </span>
            )}
          </div>

          <div className="app__selector selector">
            <select
              className="selector__field"
              value={userId}
              onChange={setNewUserId}
            >
              <option value={0}>Choose a user</option>
              {users.map((el) => (
                <option value={el.id} key={el.id}>{el.name}</option>
              ))}
            </select>
            {userIdError && (
              <span className="selector__error">
                Please choose a user
              </span>
            )}
          </div>

          <button type="submit" className="app__button button">Add</button>
        </form>
      </div>

      <TodoList todos={preparedTodos} />

    </div>
  );
};

export default App;
