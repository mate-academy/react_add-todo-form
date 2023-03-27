import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function findUser(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

const toDoList = todosFromServer.map(todo => (
  {
    ...todo,
    user: findUser(todo.userId),
  }
));

export const App = () => {
  const [titleFornewTodos, setTitleFornewTodos] = useState('');
  const [userIdFornewTodos, setUserIdFornewTodos] = useState(0);
  const [newTodos, setnewTodos] = useState(toDoList);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);

  function getId(todos: Todo[]): number {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  const handleNewTitle = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFornewTodos(event.target.value);
    setInvalidTitle(false);
  });

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserIdFornewTodos(Number(event.target.value));
    setInvalidUser(false);
  };

  const clear = () => {
    setInvalidTitle(false);
    setInvalidUser(false);
    setUserIdFornewTodos(0);
    setTitleFornewTodos('');
  };

  const handleNewTodos = (event: React.FormEvent) => {
    event.preventDefault();

    if (userIdFornewTodos && titleFornewTodos) {
      const todoToAdd = {
        id: getId(newTodos),
        title: titleFornewTodos,
        completed: false,
        userId: userIdFornewTodos,
        user: findUser(userIdFornewTodos),
      };

      setnewTodos(prevTodos => [...prevTodos, todoToAdd]);

      clear();
    }

    if (!userIdFornewTodos) {
      setInvalidUser(true);
    }

    if (!titleFornewTodos) {
      setInvalidTitle(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/users"
        method="POST"
        onSubmit={handleNewTodos}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleFornewTodos}
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
            value={userIdFornewTodos}
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
