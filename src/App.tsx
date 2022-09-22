import './App.scss';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const visibleTodos: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

const todosId = visibleTodos.map(({ id }) => id);

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isCorrectTitle, setIsCorrectTitle] = useState(true);
  const [isCorrectUserId, setIsCorrectUserId] = useState(true);


  const getTodo = () => {
    const newTodo = {
      id: Math.max(...todosId) + 1,
      title,
      completed: false,
      userId,
      user: getUser(userId)
    };

    visibleTodos.push(newTodo);

    setUserId(0);
    setTitle('');
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+(event.target.value));
    setIsCorrectUserId(true);
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsCorrectTitle(true);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsCorrectUserId(false);
    }

    if (!title.trim()) {
      setIsCorrectTitle(false);
    }

    if (!userId || !title.trim()) {
      return;
    }

    getTodo();

    setIsCorrectTitle(true);
    setIsCorrectUserId(true);
    setTitle('');
    setUserId(0);
  }
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleID">
            <span>{'Title: '}</span>

            <input
              type="text"
              data-cy="titleInput"
              placeholder='Enter a title'
              onChange={handleChangeTitle}
              value={title}
              id={'titleID'}
            />
            {
              !isCorrectTitle
                &&
                <span className="error">Please enter a title</span>
            }
          </label>
        </div>

        <div className="field">
          <label htmlFor="selectId">
            <span>{'User: '}</span>
            <select
              data-cy="userSelect"
              onChange={handleChangeUserId}
              defaultValue={userId}
              value={userId}
              id='selectId'
            >
              <option value="0" disabled>Choose a user</option>
              {
                  usersFromServer.map(({ name, id }) => (
                    <option
                      value={id}
                      key={id}
                    >
                      {name}
                    </option>
                  ))
                }
            </select>

            {
              isCorrectUserId
                ||
                <span className="error">Please choose a user</span>
            }
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos}/>
    </div>
  );
};
