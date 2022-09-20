import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUser = (userId: number): User | null => usersFromServer
  .find(user => user.id === userId) || null;

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const todosId = todos.map(todo => todo.id);
let largestTodoId = Math.max(...todosId);

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [isValidatedUser, setIsValidatedUser] = useState(true);
  const [title, setTitle] = useState('');
  const [isValidatedTitle, setIsValidatedTitle] = useState(true);

  const getTodo = ():void => {
    largestTodoId += 1;

    const newTodo: Todo = {
      id: largestTodoId,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    todos.push(newTodo);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsValidatedTitle(true);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsValidatedUser(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsValidatedUser(false);
    }

    if (!title.trim()) {
      setIsValidatedTitle(false);
    }

    if (!title.trim() || !userId) {
      return;
    }

    getTodo();
    setUserId(0);
    setTitle('');
    setIsValidatedTitle(true);
    setIsValidatedUser(true);
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
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={changeTitle}
            placeholder="Enter title"
          />
          {isValidatedTitle || (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            defaultValue={userId}
            onChange={changeUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ name, id }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>

          {isValidatedUser || (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
