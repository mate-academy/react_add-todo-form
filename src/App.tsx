import React, { useState } from 'react';
import './App.scss';
import classnames from 'classnames';
import { PreparedTodo } from './react-app-env';
import { TodoList } from './components/TodoList';
import 'bulma/css/bulma.min.css';

import todos from './api/todos';
import users from './api/users';

const preparedTodos: PreparedTodo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [todosList, setTodosList] = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [selectedUser, setselectedUser] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [hasErrorUser, setHasErrorUser] = useState(false);

  const newTodos = () => (
    [...todosList, {
      userId: selectedUser,
      id: todosList.length + 1,
      title,
      completed,
      user: users.find(user => user.id === selectedUser),
    }]
  );

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && selectedUser) {
      setTodosList(newTodos);

      setTitle('');
      setCompleted(false);
      setselectedUser(0);
    }

    setHasErrorTitle(!title);
    setHasErrorUser(!selectedUser);
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>
      <form
        onSubmit={addTodo}
        className="form box is-flex is-flex-direction-column
        is-align-items-center"
      >
        <div>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Add a task"
            className={classnames(
              { error: hasErrorTitle },
              'input-select',
              'form__field',
            )}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setHasErrorTitle(false);
            }}
          />

          <span className="pl-3">
            {hasErrorTitle && (
              'Please enter the title'
            )}
          </span>
        </div>

        <div className="mt-3">
          <select
            name=""
            id=""
            data-cy="userSelect"
            value={selectedUser}
            className={classnames(
              'input-select',
              'form__field',
              { error: hasErrorTitle },
            )}
            onChange={(event) => {
              setselectedUser(+event.target.value);
              setHasErrorUser(false);
            }}
          >
            <option value={0} disabled>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <span className="pl-3">
            {hasErrorUser && (
              'Please choose a user'
            )}
          </span>
        </div>

        <label htmlFor="completed">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            className="mt-3"
            onChange={() => {
              setCompleted(!completed);
              setHasErrorUser(false);
            }}
          />
          {' Status'}
        </label>

        <button
          type="submit"
          className="button is-success mt-3"
        >
          Add
        </button>
      </form>

      <TodoList preparedTodos={todosList} />
    </div>
  );
};

export default App;
