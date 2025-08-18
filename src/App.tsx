import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

type TodoWithUser = Todo & {
  user: User;
};

export const App = () => {
  const [todos, SetTodos] = useState<TodoWithUser[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(u => u.id === todo.userId)!,
    })),
  );
  const [title, SetTitle] = useState('');
  const [userId, SetUserId] = useState(0);
  const [titleError, SetTitleError] = useState(false);
  const [userError, SetUserError] = useState(false);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    let isFormValid = true;

    if (!title.trim()) {
      SetTitleError(true);
      isFormValid = false;
    }

    if (userId === 0) {
      SetUserError(true);
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: usersFromServer.find(u => u.id === userId)!,
    };

    SetTodos(prev => [...prev, newTodo]);

    SetTitle('');
    SetUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo} action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={event => {
              const cleaned = event.target.value.replace(
                /[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9 ]/g,
                '',
              );

              SetTitle(cleaned);
              SetTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            defaultValue={0}
            value={userId}
            onChange={event => {
              SetUserId(Number(event.target.value));
              SetUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            data-id={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
            key={todo.id}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>

            <a className="UserInfo" href={`mailto:${todo.user.email}`}>
              {todo.user.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
