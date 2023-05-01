import { FC, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App:FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setTodo] = useState(todos);
  const [isEmptyTitle, isEmptyTitleCheck] = useState(true);
  const [isUserSelected, isUserSelectedCheck] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    const maxId = Math.max(...visibleTodos.map(todo => todo.id));

    if (!trimmedTitle) {
      isEmptyTitleCheck(false);

      return;
    }

    const user = getUserById(userId);

    if (!user) {
      isUserSelectedCheck(false);

      return;
    }

    const selectedUser = getUserById(userId);

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
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(event.target.value);
    isEmptyTitleCheck(true);
  };

  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(event.target.value));
    isUserSelectedCheck(true);
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
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleChange}
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
              onChange={handleUserChange}
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
