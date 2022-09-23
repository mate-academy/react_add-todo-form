import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const defaultTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUser(todo.userId),
  }
));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(defaultTodos);
  const [completed] = useState(false);
  const [isTitleError, setIsTitleEror] = useState(false);
  const [isUserError, setIsUserEror] = useState(false);

  const createdTodo = () => {
    return {
      id: Math.max(0, ...todos.map(({ id }) => id + 1)),
      title,
      completed,
      userId,
      user: getUser(userId) || null,
    };
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length === 0) {
      setIsTitleEror(true);
    }

    if (userId === 0) {
      setIsUserEror(true);
    }

    if (isTitleError || isUserError) {
      return;
    }

    if (title.length > 0 && userId !== 0) {
      setTitle('');
      setUserId(0);
      setTodos([...todos, createdTodo()]);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setIsTitleEror(false);
              }}
            />
            { isTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </div>

          <div className="field">
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(Number(event.target.value));
                setIsUserEror(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id}>{user.name}</option>))}
            </select>

            { isUserError && (
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

        <section className="TodoList">
          <TodoList todos={todos} />

        </section>
      </div>
    </>
  );
};
