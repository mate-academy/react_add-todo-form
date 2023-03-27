import React, { FormEvent, useState } from 'react';
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

  const handleTitleChange = (value: string) => {
    const validateTitle = value.split('').filter(char => {
      return char.match(/^[A-Za-z]*$/) || char.match(/\s/);
    });

    setTitle(validateTitle.join(''));
  };

  const handleOnSubmit = (eventsubmit: FormEvent) => {
    eventsubmit.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (user === '0') {
      setUserError(true);
    }

    if (title.trim() !== '' && user !== '0') {
      setTodolist([
        ...todolist,
        {
          id: Math.max(...todolist.map(todo => todo.id)) + 1,
          title: title.toLowerCase(),
          completed: false,
          userId: Number(user),
        },
      ]);
      setTitle('');
      setUser('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={(eventsubmit) => handleOnSubmit(eventsubmit)}>
        <div className="field">
          <input
            placeholder="Enter Title"
            value={title}
            type="text"
            data-cy="titleInput"
            onChange={(element) => handleTitleChange(element.target.value)}
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

      <TodoList todoList={todolist} userList={usersFromServer} />
    </div>
  );
};
