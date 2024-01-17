import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

export const App = () => {
  const [title, setTitle] = useState('');
  const [choosedUser, setChoosedUser] = useState(0);
  const [isNotValidTitle, setIsNotValidTitle] = useState(false);
  const [isNotValidChoosedUser, setIsNotValidChoosedUser] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(todosFromServer);

  const getMaxId = () => {
    return Math.max(...visibleTodos.map(todos => todos.id));
  };

  const findUser = (id: number) => {
    return usersFromServer.find(user => user.id === id) as User;
  };

  const todoWithUser = visibleTodos.map(todo => ({
    ...todo,
    user: findUser(todo.userId),
  }));

  const handleReset = () => {
    setTitle('');
    setChoosedUser(0);
    setIsNotValidTitle(false);
    setIsNotValidChoosedUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsNotValidTitle(true);
      setTitle('');
    }

    if (!choosedUser) {
      setIsNotValidChoosedUser(true);
    }

    if (title.trim() && choosedUser) {
      setVisibleTodos([...visibleTodos, {
        id: getMaxId() + 1,
        title,
        completed: false,
        userId: choosedUser,
      }]);
      handleReset();
    }
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsNotValidTitle(false);
  };

  const onChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChoosedUser(+event.target.value);
    setIsNotValidChoosedUser(false);
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
          <label>
            {'Title: '}
            <input
              onChange={event => onChangeTitle(event)}
              value={title}
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
            />
          </label>
          {isNotValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              onChange={event => onChangeUser(event)}
              data-cy="userSelect"
              defaultValue={0}
              value={choosedUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isNotValidChoosedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todoWithUser}
      />
    </div>
  );
};
