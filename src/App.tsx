import { useState } from 'react';
import './App.scss';
// import classNames from 'classnames';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, TodoUser, User } from './interfaces';

const todosUsersFiltered: TodoUser[] = todosFromServer.map((todo: Todo) => {
  const matchUser = usersFromServer.find(
    (user: User) => user.id === todo.userId,
  );

  return {
    ...todo,
    user: matchUser,
  };
});

export const App = () => {
  const [count, setCount] = useState(16);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [errTitle, setErrTitle] = useState(false);
  const [errUser, setErrUser] = useState(false);
  const [todoUsers, setTodoUser] = useState<TodoUser[]>(todosUsersFiltered);
  const usersArr = [
    {
      id: 0,
      name: 'Choose a user',
    },
    ...usersFromServer,
  ];

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(event.target.value);

    setSelectedUser(userId);
    setErrUser(false);
  };

  const handlTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrTitle(false);
  };

  const submitButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (title === '') {
      setErrTitle(true);
      hasError = true;
    } else {
      setErrTitle(false);
    }

    if (selectedUser === 0) {
      setErrUser(true);
      hasError = true;
    } else {
      setErrUser(false);
    }

    if (hasError) {
      return;
    }

    const user = usersFromServer.find(({ id }) => id === selectedUser);

    const obj = {
      id: count,
      title,
      userId: selectedUser,
      completed: false,
      user,
    };

    setTodoUser([...todoUsers, obj]);
    setCount(count + 1);
    setTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={submitButton}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handlTitle}
          />
          {errTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={handleUserSelect}
            value={selectedUser}
          >
            {usersArr.map(user => (
              <option value={user.id} key={user.id} disabled={user.id === 0}>
                {user.name}
              </option>
            ))}
          </select>
          {errUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
        <TodoList todos={todoUsers} />
      </form>
    </div>
  );
};
