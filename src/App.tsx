import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';
import fetchedTodos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import 'bulma/css/bulma.min.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState([...fetchedTodos]);
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [hasErrorUser, setHasErrorUser] = useState(false);

  const readyTodos = [...todos].map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));

  const newTodos = () => (
    [...todos, {
      userId: selectUser,
      id: todos.length + 1,
      title,
      completed,
    }]
  );

  const addNewTodo = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && selectUser) {
      setTodos(newTodos);
    }

    setTitle('');
    setCompleted(false);
    setSelectUser(0);

    setHasErrorTitle(!title);
    setHasErrorUser(!selectUser);
  };

  return (
    <div className="App">
      <div className="error-container">
        <h4 className="error-container__item">
          {hasErrorTitle && (
            'Please enter the title'
          )}
        </h4>

        <h4 className="error-container__item">
          {hasErrorUser && (
            'Please choose a user'
          )}
        </h4>
      </div>
      <div className="form-container">
        <form onSubmit={(event) => addNewTodo(event)}>
          <div className="box is-bordered">
            <input
              className={classNames({ error: hasErrorTitle }, 'input-select')}
              type="text"
              placeholder="Enter value"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setHasErrorTitle(false);
              }}
            />
            <select
              className={classNames({ error: hasErrorUser }, 'input-select')}
              value={selectUser}
              onChange={(event => {
                setSelectUser(+event.target.value);
                setHasErrorUser(false);
              })}
            >
              <option disabled value={0}>Choose User</option>

              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}

            </select>
          </div>

          <div>
            <p>
              Status:
            </p>

            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
            />
          </div>

          <button
            type="submit"
            className="button is-success"
          >
            Add
          </button>
        </form>
      </div>
      <TodoList readyTodos={readyTodos} />
    </div>
  );
};

export default App;
