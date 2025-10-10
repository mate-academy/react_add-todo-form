import React, { useMemo, useState } from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [touched, setTouched] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const maxId = useMemo(
    () => (todos.length ? Math.max(...todos.map(t => t.id)) : 0),
    [todos],
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setTouched(true);

    const hasTitleError = title.trim() === '';
    const hasUserError = userId === '';

    setTitleError(hasTitleError);
    setUserError(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }


    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId('');
    setTitleError(false);
    setUserError(false);
    setTouched(false);
  };


  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
    if (touched) setTitleError(false);
  };


  const onUserChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const v = e.target.value === '' ? '' : Number(e.target.value);
    setUserId(v);
    if (touched) setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title"><strong>Title:</strong></label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={onTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user"><strong>User:</strong></label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={onUserChange}
          >
            {}
            <option value="">Choose a user</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">Add</button>
      </form>

      {}
      <section className="TodoList">
        {todos.map(todo => {
          const user = users.find(u => u.id === todo.userId)!;

          return (
            <article
              key={todo.id}
              data-id={todo.id}
              className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
            >
              <h2 className="TodoInfo__title">{todo.title}</h2>

              <a className="UserInfo" href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};

