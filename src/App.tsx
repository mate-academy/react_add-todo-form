import './App.scss';

import { FormEventHandler, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

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
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todosState, setTodosState] = useState(todos);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  function addTodo(newTodo: Todo) {
    const updatedTodos = [...todosState];

    updatedTodos.push(newTodo);

    setTodosState(updatedTodos);
  }

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError('Please enter a title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (user === '') {
      setUserError('Please choose a user');
      hasError = true;
    } else {
      setUserError('');
    }

    if (hasError) {
      return;
    }

    const selectedUser = getUser(+user);

    const maxId = Math.max(...todosState.map(todo => todo.id));
    const newId = maxId + 1;

    const newTodo = {
      id: newId,
      title,
      completed: false,
      userId: +user,
      user: selectedUser,
    };

    addTodo(newTodo);

    setTitle('');
    setUser('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
    if (userError) {
      setUserError('');
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title:
          </label>
          <input
            className="addTodo addTodo__title"
            type="text"
            data-cy="titleInput"
            id="title"
            name="title"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
          </label>
          <select
            className="addTodo"
            data-cy="userSelect"
            id="user"
            name="user"
            value={user}
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="addTodo addTodo__button"
        >
          Add task
        </button>
      </form>

      <TodoList todos={todosState} />

    </div>
  );
};
