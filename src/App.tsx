import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('0');
  const [todolist, setTodolist] = useState(todosFromServer);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const toDoData = todolist.map(todo => {
    const getUser = usersFromServer.find(users => users.id === todo.userId);

    return {
      ...todo,
      userId: getUser,
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setTitleError(!title.trim());
          setUserError(user === '0');
          if (title.trim() !== '' && user !== '0') {
            setTodolist([
              ...todolist,
              {
                id: todolist.length,
                title: title.toLowerCase(),
                completed: false,
                userId: Number(user),
              },
            ]);
            setTitle('');
            setUser('0');
          }
        }}
      >
        <div className="field">
          <input
            placeholder="Enter Title"
            value={title}
            type="text"
            data-cy="titleInput"
            onChange={(element) => {
              const validateTitle = element.target.value
                .split('').filter(char => {
                  return char.match(/^[A-Za-z]*$/) || char.match(/\s/);
                });

              setTitle(validateTitle.join(''));
            }}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={user}
            data-cy="userSelect"
            onChange={(element) => setUser(element.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(users => (
              <option value={users.id}>{users.name}</option>
            ))}
          </select>
          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todolist={toDoData} />
    </div>
  );
};
