import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

// api
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

// types
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | undefined {
  return usersFromServer.find((user) => user.id === userId);
}

const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);
  const [newUserId, setNewUserId] = useState(0);
  const [newTodoName, setNewTodoName] = useState('');
  const [hasUserError, setHasUserError] = useState(false);
  const [hasTodoNameError, setHasTodoNameError] = useState(false);

  const handleReset = () => {
    setNewUserId(0);
    setNewTodoName('');
  };

  const addNewTodo = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: newTodos.length + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setNewTodos((previousGoods) => [...previousGoods, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoName && newUserId) {
      addNewTodo(newTodoName, newUserId);
      handleReset();
    }

    setHasUserError(!newUserId);
    setHasTodoNameError(!newTodoName);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodoName}
            onChange={(event) => {
              setNewTodoName(event.target.value);
            }}
          />

          {hasTodoNameError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newUserId}
            onChange={(event) => setNewUserId(+event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(currentUser => (
              <option
                key={currentUser.id}
                value={currentUser.id}
              >
                {currentUser.name}
              </option>
            ))}
          </select>

          {hasUserError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
