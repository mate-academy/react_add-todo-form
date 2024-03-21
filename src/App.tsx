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
  const [failChecks, setFailChecks] = useState([false, false]);

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    const currentFailCheck = [false, false];

    if (titleInput === '') {
      currentFailCheck[0] = true;
    }

    if (userIdInput === 'Placeholder') {
      currentFailCheck[1] = true;
    }

    if (currentFailCheck[0] || currentFailCheck[1]) {
      setFailChecks(currentFailCheck);

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
    setFailChecks([false, false]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            placeholder="Title"
            onChange={e => {
              if (e.target.value !== '') {
                setFailChecks(([, b]) => {
                  return [false, b];
                });
              }

              setTitleInput(e.target.value);
            }}
            value={titleInput}
            type="text"
            data-cy="titleInput"
          />
          {failChecks[0] && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            onChange={e => {
              if (e.target.value !== 'Placeholder') {
                setFailChecks(([a]) => {
                  return [a, false];
                });
              }

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

          {failChecks[1] && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
