import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function findUserById(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

const todoList = todosFromServer.map(todo => (
  {
    ...todo,
    user: findUserById(todo.userId),
  }
));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todoList);
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidUser, setIsInvalidUser] = useState(false);

  function getNextId(aviableTodos: Todo[]): number {
    return Math.max(...aviableTodos.map(todo => todo.id)) + 1;
  }

  const handleNewTitle = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsInvalidTitle(false);
  });

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsInvalidUser(false);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId && title) {
      const todoToAdd = {
        id: getNextId(todos),
        title,
        completed: false,
        userId,
        user: findUserById(userId),
      };

      setTodos(prevTodos => [...prevTodos, todoToAdd]);

      setUserId(0);
      setTitle('');
    }

    setIsInvalidUser(!userId);

    setIsInvalidTitle(!title);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleNewTitle}
            placeholder="title..."
          />
          {isInvalidTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            placeholder="Choose a user"
            value={userId}
            onChange={handleSelectUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isInvalidUser
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
