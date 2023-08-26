/* eslint-disable no-console */
import { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

// console.log(usersFromServer);

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  // const initialTodos: Todo[] = todosFromServer.map(todo => ({
  //   ...todo,
  //   user: getUser(todo.userId),
  //   // here possibly duplicating with const todos outisde of app comp
  // }));

  const [localTodos, setTodos] = useState<Todo[]>(todos);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]); // Creates a new array and triggers a re-render
  };

  const handleAddTodo = () => {
    if (selectedUserId === null) {
      return; // Prevent adding if user not selected
    }

    addTodo({
      id: 16,
      title: 'some other todo',
      completed: false,
      userId: 1,
      user: getUser(selectedUserId),
    });
  };

  console.log(todos, '= todosFromServer');
  console.log(localTodos, '= localTodos');
  console.log(selectedUserId, '= selectedUserid');

  // start by implement the ability to select from already existing users.

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            aria-label="Title"
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            aria-label="User"
            value={selectedUserId || '0'}
            onChange={e => setSelectedUserId(Number(e.target.value))}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {(selectedUserId === null || selectedUserId === 0) && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={localTodos} />
    </div>
  );
};
