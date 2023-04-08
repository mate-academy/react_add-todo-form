import { useState } from 'react';
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
  const [todos, setTodos] = useState<ToDo[]>(todosInfo);
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleChange(e: React.BaseSyntheticEvent) {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    }

    if (name === 'user') {
      setUser(value);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setFormSubmitted(true);

    if (!title.trim()) {
      setTitle('');
    }

    if (!user) {
      setUser('');
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
            !title && formSubmitted && (
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

              {usersFromServer.map(userFromServer => (
                <option key={userFromServer.id}>{userFromServer.name}</option>
              ))}
            </select>
          </label>

          {
            !user && formSubmitted && (
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
