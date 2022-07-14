import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import users from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageTitle, setErrorMessageTitle] = useState('');

  const handlingTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtredTitle = event.target.value.replace(/[^a-zа-яё0-9\s]/gi, '');

    setTitle(filtredTitle);

    if (event.target.value === '') {
      setErrorMessageTitle('Please enter the title');
    } else {
      setErrorMessageTitle('');
    }
  };

  const handlingUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));

    if (Number(event.target.value) < 0) {
      setErrorMessage('Please choose a user');
    } else {
      setErrorMessage('');
    }
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId < 0) {
      setErrorMessage('Please choose a user');
    } else if (title === '') {
      setErrorMessageTitle('Please enter the title');
    } else {
      const user = users.find((person) => person.id === userId) || null;

      const addedTODO = {
        id: todos.length + 1,
        userId,
        title,
        completed: false,
        user,
      };

      setTodos(todos.concat(addedTODO));
      setUserId(-1);
      setTitle('');
    }
  };

  return (
    <div className="App container">
      <h1 className="title">Add todo form</h1>

      <form className="box" onSubmit={(event) => addTodo(event)}>
        <div className="field">
          <label className="label" htmlFor="todoTitle">
            Enter your TODO
          </label>
          <div className="control">
            <input
              className="input is-medium"
              type="text"
              name="todoTitle"
              id="todoTitle"
              value={title}
              placeholder="Add your TODO"
              data-cy="titleInput"
              onChange={handlingTitle}
            />
          </div>
          {errorMessageTitle && (
            <p className="help is-danger">{errorMessageTitle}</p>
          )}
        </div>

        <div className="select">
          <select
            name="username"
            id="username"
            onChange={handlingUserSelect}
            data-cy="userSelect"
          >
            <option value="-1">Choose a user</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errorMessage && <p className="help is-danger">{errorMessage}</p>}
        </div>

        <button className="button is-primary" type="submit">
          Add TODO
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
