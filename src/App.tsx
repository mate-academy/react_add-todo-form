import './App.scss';
import { useState } from 'react';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(todosFromServer);

  const [titleValue, setTitleValue] = useState('');
  const [isTitleInput, setIsTitleInput] = useState(true);

  const [userValue, setUserValue] = useState(0);
  const [isUserSelected, setIsUserSelected] = useState(true);

  const handleSubmit = (event: React.FormEvent): number => {
    event.preventDefault();

    if (titleValue === '') {
      setIsTitleInput(false);
    }

    if (userValue === 0) {
      setIsUserSelected(false);
    }

    if (titleValue === '' || userValue === 0) {
      return 0;
    }

    const newTodo = {
      id: Math.max(...visibleTodos.map(todo => todo.id)) + 1,
      title: titleValue,
      completed: false,
      userId: userValue,
    };

    setVisibleTodos(currentTodos => [...currentTodos, newTodo]);

    setTitleValue('');
    setUserValue(0);

    return 0;
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsTitleInput(true);
    setTitleValue(event.target.value);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setIsUserSelected(true);
    setUserValue(+event.target.value);
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
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={titleValue}
            onChange={event => handleTitle(event)}
          />
          {!isTitleInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            name="title"
            data-cy="userSelect"
            value={userValue}
            onChange={event => handleUser(event)}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map((user, index) => (
              <option key={user.id} value={1 + index}>{user.name}</option>
            ))}
          </select>

          {!isUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={visibleTodos}
      />
    </div>
  );
};
