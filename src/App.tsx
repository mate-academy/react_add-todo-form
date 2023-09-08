import { FormEventHandler, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [allTodos, setAllTodos] = useState(todos);

  const handleNewTitle: React.ChangeEventHandler<HTMLInputElement>
  = (event) => {
    setTitleError('');

    return setTitle(event.target.value);
  };

  const handleUserChange: React.ChangeEventHandler<HTMLSelectElement>
  = (event) => {
    setUserError('');

    return setUserId(event.target.value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (userId === '0') {
      setUserError('Please choose a user');
    }

    if (title && userId !== '0') {
      const findMaxId = Math.max(...allTodos.map(todo => todo.id), 0);
      const todo: Todo = {
        id: findMaxId + 1,
        title,
        userId: +userId,
        completed: false,
        user: getUser(+userId),
      };

      setAllTodos([...allTodos, todo]);

      setTitle('');
      setUserId('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            onChange={handleNewTitle}
            placeholder="Enter a title"
          />
          <span className="error">{titleError}</span>
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <span className="error">{userError}</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={allTodos} />
      </section>
    </div>
  );
};
