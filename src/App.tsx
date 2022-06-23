import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './typedefs';

const preparedTodos: PreparedTodo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [todosList, setTodosList] = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  const newTodo = () => (
    [...todosList, {
      userId: selectUser,
      id: todosList.length + 1,
      title,
      completed,
      user: users.find(user => user.id === selectUser),
    }]
  );

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && selectUser) {
      setTodosList(newTodo);
      setTitle('');
      setCompleted(false);
      setSelectUser(0);
    }

    setErrorUser(!selectUser);
    setErrorTitle(!title);
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>
      <form
        action="get"
        onSubmit={addTodo}
        className="form"
      >
        <div>
          <select
            className="form__select"
            name=""
            id=""
            data-cy="userSelect"
            value={selectUser}
            onChange={(changeEvent) => {
              setSelectUser(+changeEvent.target.value);
              setErrorUser(false);
            }}
          >
            <option
              value={0}
              disabled
            >
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="error">
            {errorUser && (
              'Please choose a user'
            )}
          </p>

          <input
            className="form__input"
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Add todo"
            value={title}
            onChange={(changeEvent) => {
              setTitle(changeEvent.target.value);
              setErrorTitle(false);
            }}

          />
          <p className="form__error">
            {errorTitle && (
              'Please enter the title'
            )}
          </p>
        </div>

        <button
          type="submit"
          className="form__button-submit"
        >
          Add todo
        </button>

      </form>

      <TodoList todos={todosList} />
    </div>
  );
};

export default App;
