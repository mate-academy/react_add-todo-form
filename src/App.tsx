import './App.scss';
import './field.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [addedTitle, setAddedTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [addedUser, setAddedUser] = useState(false);

  const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

  const addTodo = (id: number) => {
    if (getUser(id) && title.trim()) {
      todos.push({
        id: newTodoId,
        title,
        userId,
        completed: false,
        user: getUser(userId),
      });

      setUserId(0);
      setTitle('');
    }

    if (!title.trim()) {
      setAddedTitle(true);
    }

    if (!userId) {
      setAddedUser(true);
    }
  };

  const handleForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(userId);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setAddedTitle(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setAddedUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleForm}
        className="field"
      >
        <div>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            className="field__input"
            value={title}
            onChange={handleTitle}
          />
          {addedTitle && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            className="field__input"
            value={userId}
            onChange={handleUser}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {addedUser && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="field__submit"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
