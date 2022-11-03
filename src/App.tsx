import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [userSelect, setUserSelect] = useState('0');
  const [title, setTitile] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [submit, setSubmit] = useState(true);

  const trimedTitle = title.trim();

  const handleSubmit = (event:React.MouseEvent) => {
    event.preventDefault();

    if (!trimedTitle || userSelect === '0') {
      setSubmit(false);

      return null;
    }

    const largestTodoId = todos.reduce((previously, currently) => (
      previously.id > currently.id ? previously : currently
    ));

    const newTodo = {
      id: largestTodoId.id + 1,
      title: trimedTitle,
      completed: false,
      userId: Number(userSelect),
    };

    setTodos(old => (
      [...old, newTodo]
    ));
    setTitile('');
    setUserSelect('0');
    setSubmit(true);

    return null;
  };

  const handleTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitile(event.target.value);
  };

  const handleChangeUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form>
        <div className="field">
          <label htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {
            !trimedTitle && !submit && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
          </label>
          <select
            id="user"
            data-cy="userSelect"
            name="userSelect"
            value={userSelect}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option value={user.id}>{user.name}</option>
              ))
            }
          </select>
          {
            userSelect === '0' && !submit && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
