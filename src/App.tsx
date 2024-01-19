import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoWithUser } from './types/TodoWithUser';
import { User } from './types/User';

export const App = () => {
  const todosWithUser = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => (user.id === todo.userId)) as User,
  }));

  const [visibleTodos, setVisibleTodos] = useState(todosWithUser);

  const [title, setTitle] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);
  const hasTitleError = titleTouched && !title;

  const [selectedUser, setSelectedUser] = useState('0');
  const [userTouched, setUserTouched] = useState(false);
  const hasUserError = userTouched && selectedUser === '0';

  const clear = () => {
    setTitle('');
    setSelectedUser('0');
    setTitleTouched(false);
    setUserTouched(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || selectedUser === '0') {
      setTitleTouched(true);
      setUserTouched(true);

      return;
    }

    function giveMaxId(arrOfSomething: TodoWithUser[]) {
      const maxId = Math.max(...arrOfSomething.map(todo => todo.id)) + 1;

      return maxId;
    }

    const newTodo: TodoWithUser = {
      id: giveMaxId(visibleTodos),
      title,
      completed: false,
      user: usersFromServer.find(user => (user.id === +selectedUser)) as User,
      userId: +selectedUser,
    };

    setVisibleTodos([
      ...visibleTodos,
      newTodo,
    ]);

    clear();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={event => setTitle(event.target.value)}
            placeholder="Enter a title"
            value={title}
          />
          {!hasTitleError
            || <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={event => setSelectedUser(event.target.value)}
            value={selectedUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {!hasUserError || <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
