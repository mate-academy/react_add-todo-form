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
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [showUserError, setShowUserError] = useState(false);
  const [showTitleError, setShowTitleError] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        let shouldExit = false;

        if (userId === '0') {
          setShowUserError(true);
          shouldExit = true;
        }

        if (!title.trim()) {
          setShowTitleError(true);
          shouldExit = true;
        }

        if (shouldExit) {
          return;
        }

        const newTodo = {
          id: Math.max(...storedTodos.map(todo => todo.id)) + 1,
          title,
          userId: +userId,
          completed: false,
          user: getUser(+userId),
        };

        setStoredTodos([...storedTodos, newTodo]);

        setTitle('');
        setUserId('0');
      }}
      >
        <div className="field">
          <input
            name="title"
            value={title}
            type="text"
            placeholder="Enter the title"
            data-cy="titleInput"
            onChange={(event) => {
              setShowTitleError(false);
              setTitle(event.target.value);
            }}
          />
          {showTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="user"
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setShowUserError(false);
              setUserId(event.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {showUserError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={storedTodos} />
    </div>
  );
};
