import { FormEvent, useState } from 'react';
import './App.scss';
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

export const App = () => {
  const [prevTodos, setPrevTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [completed] = useState(false);
  const [isTitleCorrect, setIsTitleCorrect] = useState(false);
  const [isUserIdCorrect, setIsUserIdCorrect] = useState(false);

  const getTodo = () => {
    return (
      {
        id: Math.max(0, ...prevTodos.map(({ id }) => id + 1)),
        title,
        userId,
        completed,
        user: getUser(userId),
      }
    );
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleCorrect(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUserIdCorrect(false);
  };

  const handleChange = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsTitleCorrect(true);
    }

    if (userId === 0) {
      setIsUserIdCorrect(true);
    }

    if (userId === 0 || !title.trim()) {
      return;
    }

    setTitle('');
    setUserId(0);
    setPrevTodos([...prevTodos, getTodo()]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleChange}
      >
        <div className="field">
          <span>{'Title: '}</span>
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {isTitleCorrect
          && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <span>{'User: '}</span>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserId}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(({ name, id }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>

          {isUserIdCorrect
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={prevTodos} />
      </section>
    </div>
  );
};
