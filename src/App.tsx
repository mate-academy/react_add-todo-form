import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUser = todos.map(todo => ({
  ...todo,
  user: (users.find(user => user.id === todo.userId) || null),
}));

const App: React.FC = () => {
  const [preparedTodos, setTodos] = useState([...todosWithUser]);
  const [title, setTitle] = useState('');
  const [todoUser, setTodoUser] = useState('0');
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({
    titleError: false,
    userError: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      title,
      userId: +todoUser,
      completed,
      id: (Math.max(...preparedTodos.map(todo => todo.id)) + 1),
      user: users.find(user => user.id === +todoUser) || null,
    };

    if (title.trim().length <= 0) {
      setErrors((prevState) => ({
        ...prevState,
        titleError: true,
      }));
    }

    if (todoUser === '0') {
      setErrors((prevState) => ({
        ...prevState,
        userError: true,
      }));
    }

    if (title.trim().length <= 0 || todoUser === '0') {
      return;
    }

    setTodos([...preparedTodos, newTodo]);
    setTitle('');
    setTodoUser('0');
    setCompleted(false);
  };

  const clearErrors = () => {
    setErrors({
      titleError: false,
      userError: false,
    });
  };

  return (
    <div className="App">
      <h1 className="form__header">Add todo form</h1>
      <form
        className="form"
        onSubmit={handleSubmit}
        onChange={clearErrors}
      >
        <div>
          <label>
            {'Task title : '}
            <input
              data-cy="titleInput"
              className="form__title"
              type="text"
              name="title"
              placeholder="TITLE"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value.toUpperCase());
              }}
            />
          </label>
          {errors.titleError
            && <span className="warning">Please enter the title</span>}
        </div>
        <label>
          {'Choose assignee for a task : '}
          <select
            data-cy="userSelect"
            className="form__select"
            value={todoUser}
            onChange={(event) => {
              setTodoUser(event.target.value);
            }}
          >
            <option value="0" disabled hidden>CHOOSE A USER</option>
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        {errors.userError
          && <span className="warning">Please choose a user</span>}
        <div>
          {'Task Status : '}
          <label
            htmlFor="todo_undone"
            className={classNames('form__radioLabel',
              { unselected: completed === true })}
          >
            Undone
          </label>
          <input
            type="radio"
            name="todoStatus"
            id="todo_undone"
            value="false"
            className="form__radio"
            checked={completed === false}
            onChange={() => {
              setCompleted(false);
            }}
          />
          {'   '}
          <label
            htmlFor="todo_done"
            className={classNames('form__radioLabel',
              { unselected: completed === false })}
          >
            Done
          </label>
          <input
            type="radio"
            name="todoStatus"
            id="todo_done"
            value="true"
            className="form__radio"
            checked={completed === true}
            onChange={() => {
              setCompleted(true);
            }}
          />
        </div>
        <button type="submit" className="form__button">ADD TASK</button>
      </form>
      <TodoList preparedTodos={preparedTodos} />
    </div>
  );
};

export default App;
