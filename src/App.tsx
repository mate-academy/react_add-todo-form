import React, { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [todoList, setTodoList] = useState([...preparedTodos]);
  const [isValidTitle, setValidTitle] = useState(true);
  const [isValidUserName, setValidUserName] = useState(true);

  const addTodo = () => {
    if (!title) {
      setValidTitle(false);
    }

    if (!userName) {
      setValidUserName(false);
    }

    if (title && userName) {
      const currentUser = users.find(user => user.name === userName) || null;
      const newTodo = {
        id: todoList[todoList.length - 1].id + 1,
        title,
        userId: currentUser ? currentUser.id : 0,
        completed: false,
        user: currentUser,
      };

      setTodoList(prevTodo => [...prevTodo, newTodo]);
      setTitle('');
      setUserName('');
      setValidTitle(true);
      setValidUserName(true);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
      setValidTitle(true);
    } else {
      setUserName(value);
      setValidUserName(true);
    }
  };

  return (
    <div className="App">
      <div>
        <form
          action="#"
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            addTodo();
          }}
        >
          <div className="form__section">
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              className="form__input"
              value={title}
              onChange={handleChange}
              placeholder="Enter the title"
            />
            {!isValidTitle && <p className="error">Please enter the title</p>}
          </div>
          <div className="form__section">
            <select
              name="userName"
              data-cy="userSelect"
              className="form__select"
              value={userName}
              onChange={handleChange}
            >
              <option
                value=""
                disabled
              >
                Choose a user
              </option>
              {users.map((user) => (
                <option value={user.name} key={user.id}>{user.name}</option>
              ))}
            </select>
            {!isValidUserName && <p className="error">Please choose a user</p>}
          </div>

          <button
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </form>
      </div>
      <>
        <h1>Add todo form</h1>
        <TodoList preparedTodo={todoList} />
      </>

    </div>
  );
};

export default App;
