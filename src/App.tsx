import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './components/UserInfo';
import { Todo } from './components/TodoInfo';
import { newTodoId } from './helpers';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [userId, setUserId] = useState(0);
  const [actualTodos, setListTodos] = useState(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validTitle = title.trim();

    if (validTitle) {
      setIsTitleValid(true);
    }

    if (!userId) {
      setIsUserIdValid(true);
    }

    if (!userId || validTitle) {
      return;
    }

    const addedTodo: Todo = {
      id: newTodoId(todos),
      completed: false,
      user: getUserById(userId),
      title: validTitle,
      userId,
    };

    setListTodos(prevlist => [...prevlist, addedTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(event.target.value);
    setIsTitleValid(false);
  };

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(event.target.value));
    setIsUserIdValid(false);
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
          <input
            name="title"
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={handleInput}
          />

          {isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelect}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(userFromServer => (
              <option
                value={userFromServer.id}
                key={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>

          {isUserIdValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={actualTodos} />
    </div>
  );
};
