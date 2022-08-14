import './App.scss';
import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('-1');
  const [userError, setUserError] = useState(false);
  const [todoTitle, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const validation = () => {
    if (selectedUser !== '-1' && todoTitle !== '') {
      return true;
    }

    if (selectedUser === '-1') {
      setUserError(true);
    }

    if (todoTitle === '') {
      setTitleError(true);
    }

    return false;
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!validation()) {
      return;
    }

    const todoId = todos.reduce((acc, curr) => Math.max(acc, curr.id), -1) + 1;

    const todoToAdd = {
      id: todoId,
      title: todoTitle,
      userId: +selectedUser,
      completed: false,
    };

    setSelectedUser('-1');
    setTitle('');

    setTodos(prevState => [
      ...prevState,
      todoToAdd,
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={event => {
              setTitleError(false);
              setTitle(event.target.value
                .replace(/[^A-Za-z]/g, ''));
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:

            {' '}
            <select
              data-cy="userSelect"
              onChange={event => {
                setSelectedUser(event.target.value);
                setUserError(false);
              }}
            >
              <option value="-1" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
