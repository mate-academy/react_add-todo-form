import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

export function getUserbyId(id: number): User | undefined {
  return usersFromServer.find(user => user.id === id);
}

export const App = () => {
  const todosWithUsers = todosFromServer.map(todo => {
    return { ...todo, user: getUserbyId(todo.userId) };
  });
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleErr, setTitleErr] = useState(false);
  const [userIdErr, setUserIdErr] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title) {
      setTitleErr(true);
    }

    if (userId === 0) {
      setUserIdErr(true);
    }

    if (!title || userId === 0) {
      return;
    }

    const newId = (arr: Todo[]) => Math.max(0, ...arr.map(el => el.id)) + 1;

    const newTodo = {
      id: newId(todos),
      title: title,
      completed: false,
      userId: userId,
      user: getUserbyId(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter title"
            onChange={event => {
              setTitle(event?.target.value);
              setTitleErr(false);
            }}
          />
          {titleErr && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event?.target.value);
              setUserIdErr(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {userIdErr && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
