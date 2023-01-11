import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [storedTodos, setStoredTodos] = useState(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        const userId = Number(event.target.elements.user.value);
        const newTodo = {
          id: Math.max(...storedTodos.map(todo => todo.id)) + 1,
          title: event.target.elements.title.value,
          userId,
          completed: false,
          user: getUser(userId),
        };

        setStoredTodos([...storedTodos, newTodo]);
        event.target.reset();
      }}
      >
        <div className="field">
          <input
            name="title"
            type="text"
            data-cy="titleInput"
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select name="user" data-cy="userSelect" defaultValue="0">
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={storedTodos} />
    </div>
  );
};
