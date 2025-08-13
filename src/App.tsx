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
  completed: boolean;
  userId: number;
};

type TodoWithUser = Todo & {
  user: User;
};

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(u => u.id === todo.userId)!,
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    }

    if (userId === 0) {
      setUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: usersFromServer.find(u => u.id === userId)!,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo} action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => {
              const cleaned = e.target.value.replace(
                /[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9 ]/g,
                '',
              );

              setTitle(cleaned);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            defaultValue={0}
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              setUserError(false);
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
