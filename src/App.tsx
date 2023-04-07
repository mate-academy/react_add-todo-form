import { useEffect, useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import { ToDo } from './types/ToDo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosInfo: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosInfo);
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [hasUser, setHasUser] = useState(false);
  const [hasTitle, setHasTitle] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (title) {
      setHasTitle(true);
    }

    if (user) {
      setHasUser(true);
    }
  }, [title, user]);

  function handleChange(e: React.BaseSyntheticEvent) {
    const { name } = e.target;

    if (name === 'title') {
      setTitle(e.target.value);
    }

    if (name === 'user') {
      setUser(e.target.value);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setFormSubmitted(true);

    if (!title) {
      setHasTitle(false);
    }

    if (!user) {
      setHasUser(false);
    }

    if (title.trim() && user) {
      const newId = Math.max(...todos.map(todo => todo.id));
      const userOfToDo = usersFromServer.find(userFromServer => (
        userFromServer.name.includes(user)
      ));

      const newToDo = {
        title,
        completed: false,
        userId: userOfToDo?.id,
        id: newId + 1,
        user: userOfToDo,
      };

      setTodos(current => ([
        ...current,
        newToDo,
      ]));

      setUser('');
      setTitle('');
      setHasTitle(false);
      setHasUser(false);
      setFormSubmitted(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={handleChange}
            />
          </label>

          {
            !hasTitle && formSubmitted && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <label>
            User
            <select
              data-cy="userSelect"
              name="user"
              value={user}
              onChange={handleChange}
            >
              <option value="" disabled>Choose a user</option>

              {
                usersFromServer.map(userFromServer => (
                  <option key={userFromServer.id}>{userFromServer.name}</option>
                ))
              }
            </select>
          </label>

          {
            !hasUser && formSubmitted && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
