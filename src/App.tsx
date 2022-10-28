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

  const updateTodoList = () => {
    const newTodo = {
      id: Date.now(),
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
  };

  const handleSubmit = (event:React.MouseEvent) => {
    setSubmit(false);
    event.preventDefault();
    if (trimedTitle !== '' && userSelect !== '0') {
      setSubmit(true);

      return updateTodoList();
    }

    setSubmit(false);

    return null;
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
            onChange={event => setTitile(event.target.value)}
          />
          {
            !trimedTitle && !submit
              ? <span className="error">Please enter a title</span>
              : null
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
            onChange={event => setUserSelect(event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option value={user.id}>{user.name}</option>
              ))
            }
          </select>
          {
            userSelect === '0' && !submit
              ? <span className="error">Please choose a user</span>
              : null
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(event) => handleSubmit(event)}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
