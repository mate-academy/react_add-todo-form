import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import React from 'react';

export const App = () => {
  interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User;
}

  const [todos, setTodos] = useState<Todo[]>(todosFromServer)
  const [users] = useState<User[]>(usersFromServer)
  const [title, setTitle] = useState('')
  const [userId, setUserId] = useState(0)
  const [titleError, setTitleError] = useState(false)
  const [userError, setUserError] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleInvalid = !title.trim();
    const isUserInvalid = userId === 0;

    setTitleError(isTitleInvalid);
    setUserError(isUserInvalid);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    const currentUser = users.find(user => user.id === userId)

    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title: title,
      userId: userId,
      completed: false,
      user: currentUser
    }

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
  }
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setTitleError(false); }}
          />
          {titleError &&
            <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(e) => { setUserId(Number(e.target.value)); setUserError(false); }}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError &&
            <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            data-id={todo.id}
            key={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>

            <a
              className="UserInfo"
              href={`mailto:${todo.user?.email}`}
            >
              {todo.user?.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
