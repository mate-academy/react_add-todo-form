import './App.scss';
import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './components/TodoInfo';

function findUsersById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => (
  { ...todo, user: findUsersById(todo.userId) }
));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userSelected, setUserSelected] = useState('0');
  const [userError, setUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setTitleError(false);
    setUserSelected('0');
    setUserError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') {
      setTitleError(true);

      return;
    }

    if (userSelected === '0') {
      setUserError(true);

      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(item => item.id)) + 1,
      title,
      completed: false,
      userId: +userSelected,
      user: findUsersById(+userSelected),
    };

    setTodos([...todos, newTodo]);
    reset();
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(e.target.value);
    setUserError(false);
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
          <label htmlFor="#title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="#user">User:</label>
          <select
            data-cy="userSelect"
            id="#user"
            value={userSelected}
            onChange={handleUserSelect}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
