import React, { FormEventHandler, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [newTodos, setTodos] = useState<Todo[]>(todos);
  const [userError, setUserError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (!userId && !title) {
      setUserError('Please choose a user');
      setTitleError('Please enter a title');

      return;
    }

    // was title described?
    if (!title) {
      setTitleError('Please enter a title');

      return;
    }

    // was user selected?
    if (!userId) {
      setUserError('Please choose a user');

      return;
    }

    const userObj = usersFromServer.find(user => user.id === userId);
    const maxId = Math.max(...todos.map((todo) => todo.id));

    if (userObj) {
      const newTodo: Todo = {
        id: maxId + 1,
        title,
        userId: userObj?.id || 1,
        completed: false,
        user: ((userObj) ? getUser(userObj.id) : null),
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);

      setTitle('');
      setUserId(0);
      setUserError(null);
      setTitleError(null);
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>
      {/* 1.dodaje form  */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(null);
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>
        <div>
          <label htmlFor="user">User:</label>
          <select
            id="user"
            name="userId"
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserError(null);
            }}

          >
            <option value={0}>Choose a user</option>

            {usersFromServer.map((user) => (
              <option key={title + user.id} value={user.id}>
                {user.name}
              </option>
            ))}

          </select>
          {userError && <span className="error">{userError}</span>}
        </div>
        <button type="submit" data-cy="submitButton">Add</button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
