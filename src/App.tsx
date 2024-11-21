import React, { useState, useEffect } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState('');
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const englishRegex = /[A-Za-z]/;
    const ukrainianRegex = /[А-ЩЬЮЯҐЄІЇа-щьюяґєії]/;

    if (englishRegex.test(e.target.value)) {
      setTitle(e.target.value.replace(/[^A-Za-z0-9\s]*$/, ""));
    }

    if (ukrainianRegex.test(e.target.value)) {
      setTitle(e.target.value.replace(/[^А-ЩЬЮЯҐЄІЇа-щьюяґєії0-9\s]*$/, ''))
    }

    setTitleError(false);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
    setUserError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!title || !userId) {
      return;
    }

    setTodos(prevState => [
      ...prevState,
      {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: title,
        completed: false,
        userId: +userId,
      },
    ])
  };

  useEffect(
    () => {
      setTitle('');
      setUserId('');
    },

    [todos]
  )

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={onTitleChange}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={onSelectChange}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user: { id: number; name: string }) => (
                <option key={user.id} value={user.id.toString()}>
                  {user.name}
                </option>
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
