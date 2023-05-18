import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

enum BlockName {
  TITLE = 'title',
  USERID = 'userId',
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorUser, setIsErrorUser] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case BlockName.TITLE:
        return setTitle(value);

      case BlockName.USERID:
        return setUserId(value);

      default:
        return 0;
    }
  };

  const handleCheckValue = () => {
    setIsErrorTitle(!title);
    setIsErrorUser(!userId);
  };

  const handleAddTodo = (getTitle:string, getUserId:string) => {
    const lastIdTodo = Math.max(...todos.map(todo => todo.id));
    const newTodo = {
      id: lastIdTodo + 1,
      title: getTitle,
      completed: false,
      userId: Number(getUserId),
    };

    setTodos([...todos, newTodo]);
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
            {'Title: '}
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
            {'User: '}
            <select
              name="userId"
              data-cy="userSelect"
              value={userId}
              onChange={handleChange}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
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

      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
