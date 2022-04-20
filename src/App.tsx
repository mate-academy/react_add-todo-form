import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './components/Types/Types';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Todo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  };
});

const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const addTodo = () => {
    setTodo((prev) => ([
      ...prev,
      {
        userId,
        id: prev.length + 1,
        title,
        user: users.find(user => user.id === userId),
        completed: false,
      },
    ]));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);

    if (userId === 0) {
      setUserIdError(true);
    } else {
      setUserIdError(false);
    }

    if (!title || userIdError) {
      return;
    }

    setTitle('');
    setUserId(-1);
    addTodo();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitle(value);
        setTitleError(false);
        break;

      case 'userID':
        setUserId(Number(value));
        setUserIdError(false);
        break;

      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="form__item">
          Title:
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
          />
          {titleError && (
            <span className="error">Add title</span>
          )}
        </label>
        <label htmlFor="userID">
          userID:
          <select
            name="userID"
            id="userID"
            value={userId}
            onChange={handleChange}
          >
            <option value="0" disabled selected>
              Choose a user
            </option>
            {users.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {userIdError && (
            <span className="error">Choose user</span>
          )}
        </label>
        <button type="submit">
          Save
        </button>
      </form>
      <TodoList todos={todo} />
    </div>
  );
};

export default App;
