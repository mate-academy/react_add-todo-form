import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [isErrorTitle, setErorroTitle] = useState(false);
  const [isErrorUser, setErorroUser] = useState(false);
  const [users] = useState(usersFromServer);
  const [todos, setNewTodos] = useState(todosFromServer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case ('title'):
        return setTitle(value);

      case ('userId'):
        return setUserId(value);

      default:
        return 0;
    }
  };

  const handleCheckValue = () => {
    setErorroTitle(!title);
    setErorroUser(!userId);
  };

  const handleAddTodo = (getTitle:string, getUserId:string) => {
    const lastIdTodo = Math.max(...users.map(todo => todo.id));
    const newTodo = {
      id: lastIdTodo + 1,
      title: getTitle,
      completed: false,
      userId: Number(getUserId),
    };

    setNewTodos([...todos, newTodo]);
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && userId) {
      handleAddTodo(title, userId);
    }

    setTitle('');
    setUserId('');
  };

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
            Title:
            {' '}
            <input
              name="title"
              type="text"
              data-cy="titleInput"
              onChange={handleChange}
              value={title}
            />
          </label>

          {isErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              name="userId"
              data-cy="userSelect"
              value={userId}
              onChange={handleChange}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {isErrorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleCheckValue}
        >
          Add
        </button>
      </form>

      <TodoList users={users} todos={todos} />
    </div>
  );
};
