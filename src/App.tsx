import { FC, useState } from 'react';
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

export const App:FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setTodo] = useState(todos);
  const [isEmptyTitle, isEmptyTitleCheck] = useState(true);
  const [isUserSelected, isUserSelectedCheck] = useState(true);

  const maxId = Math.max(...visibleTodos.map(todo => todo.id));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      isEmptyTitleCheck(false);

      return;
    }

    if (!userId) {
      isUserSelectedCheck(false);

      return;
    }

    if (title && userId) {
      const selectedUser = getUser(userId) || null;

      const newTodo: Todo = {
        id: maxId + 1,
        title,
        completed: false,
        userId: selectedUser?.id || null,
        user: selectedUser,
      };

      setTodo((state) => ([...state, newTodo]));
      setTitle('');
      setUserId(0);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setTitle(event.target.value);
    isEmptyTitleCheck(true);
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
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleChange}
            />
          </label>

          {!isEmptyTitle && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(Number(event.target.value));
                isUserSelectedCheck(true);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(person => (
                <option value={person.id} key={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </label>

          {!isUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
