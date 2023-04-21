import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [isClicked, setIsClicked] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  const clearForm = () => {
    setUserId('0');
    setTitle('');
    setIsClicked(false);
  };

  const handleSubmit
   = (event:React.SyntheticEvent) => {
     event.preventDefault();
     setIsClicked(true);

     if (!title || userId === '0') {
       return;
     }

     const newTodoId: number = todosFromServer.sort(
       (a, b) => b.id - a.id,
     )[0].id + 1;

     setTodos((prevState) => [...prevState, {
       id: newTodoId,
       title,
       completed: false,
       userId: +userId,
     }]);

     clearForm();
   };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement>
    = (event) => {
      setTitle(event.target.value);
    };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
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
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Please enter a title"
              value={title}
              onChange={handleTitleChange}
            />

            {(!title && isClicked)
            && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((userFromServer) => {
              return (
                <option
                  value={userFromServer.id}
                  key={userFromServer.id}
                >
                  {userFromServer.name}
                </option>
              );
            })}
          </select>

          {(userId === '0' && isClicked)
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
