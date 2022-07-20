import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const prepearedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([...prepearedTodos]);
  const [userName, setUserName] = useState('');
  const [isTitle, setIsTitle] = useState(true);
  const [isUserName, setIsUserName] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitle(false);
    }

    if (!userName) {
      setIsUserName(false);
    }

    if (title && userName) {
      const isUser = usersFromServer
        .find(user => user.name === userName) || null;

      const newTodo: Todo = {
        id: todos[todos.length - 1].id + 1,
        title: title.trim(),
        userId: isUser
          ? isUser.id
          : null,
        completed: false,
        user: isUser || null,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserName('');
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(true);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserName(true);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        className="App__form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label className="App__field">
          <input
            type="text"
            name="title"
            placeholder="Title"
            data-cy="titleInput"
            value={title}
            onChange={(event) => handleTitle(event)}
          />

          {!isTitle && (
            <span className="App__error">
              Please, enter a title
            </span>
          )}
        </label>

        <label className="App__field">
          <select
            data-cy="userSelect"
            value={userName}
            onChange={(event) => handleUserName(event)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(currentUser => (
              <option
                value={currentUser.name}
                key={currentUser.id}
              >
                {currentUser.name}
              </option>
            ))}
          </select>

          {!isUserName && (
            <span className="App__error">
              Please, choose a user
            </span>
          )}
        </label>

        <button
          className="App__button"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
