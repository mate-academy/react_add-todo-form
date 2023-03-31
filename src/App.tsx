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
  const [titleForNewTodos, setTitleForNewTodos] = useState('');
  const [userIdForNewTodos, setUserIdForNewTodos] = useState(0);
  const [newTodos, setNewTodos] = useState(todoList);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);

  function getMaxId(todos: Todo[]): number {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  const handleNewTitle = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleForNewTodos(event.target.value);
    setInvalidTitle(false);
  });

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserIdForNewTodos(Number(event.target.value));
    setInvalidUser(false);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (userIdForNewTodos && titleForNewTodos) {
      const todoToAdd = {
        id: getMaxId(newTodos),
        title: titleForNewTodos,
        completed: false,
        userId: userIdForNewTodos,
        user: findUserById(userIdForNewTodos),
      };

      setNewTodos(prevTodos => [...prevTodos, todoToAdd]);

      setUserIdForNewTodos(0);
      setTitleForNewTodos('');
    }

    setInvalidUser(!userIdForNewTodos);

    setInvalidTitle(!titleForNewTodos);
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
            value={titleForNewTodos}
            onChange={handleNewTitle}
            placeholder="title..."
          />
          {invalidTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            placeholder="Choose a user"
            value={userIdForNewTodos}
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

          {invalidUser
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
