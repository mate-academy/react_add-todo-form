import './App.scss';

import { FormEventHandler, useState } from 'react';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const todosWithUsers = todosFromServer.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) as User,
    };
  });

  const [todos, setTodos] = useState(todosWithUsers);

  const [titleInput, setTitleInput] = useState('');
  const [userIdInput, setUserIdInput] = useState('Placeholder');
  const [failCode, setFailCode] = useState(0);

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    let currentFailCode = 0;

    if (titleInput === '') {
      currentFailCode++;
    }

    if (userIdInput === 'Placeholder') {
      currentFailCode++;
      currentFailCode++;
    }

    if (currentFailCode > 0) {
      setFailCode(currentFailCode);
      return;
    }

    const newTodo = {
      userId: Number(userIdInput),
      title: titleInput,
      completed: false,
      id:
        Math.max(
          ...todos.map(t => {
            return t.id;
          }),
        ) + 1,
      user: usersFromServer.find(
        user => user.id === Number(userIdInput),
      ) as User,
    };

    setTodos([...todos, newTodo]);
    setTitleInput('');
    setUserIdInput('Placeholder');
    setFailCode(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            onChange={e => {
              setTitleInput(e.target.value);
            }}
            value={titleInput}
            type="text"
            data-cy="titleInput"
          />
          {(failCode === 1 || failCode === 3) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            onChange={e => {
              setUserIdInput(e.target.value);
            }}
            value={userIdInput}
            data-cy="userSelect"
          >
            <option value="Placeholder" disabled>
              Choose a user
            </option>
            {usersFromServer.map(u => (
              <option value={u.id.toString()} key={u.id.toString()}>
                {u.name}
              </option>
            ))}
          </select>

          {(failCode === 2 || failCode === 3) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
