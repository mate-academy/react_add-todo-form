import './App.scss';
import { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUserId(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [currentTodos, setCurrentTodos] = useState(todos);

  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorTitle(true);
    }

    if (!userId) {
      setErrorUser(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...currentTodos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId,
      user: getUserId(userId),
    };

    setCurrentTodos(current => [...current, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={formSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={title}
              onChange={
                event => {
                  setTitle(event.target.value);
                  setErrorTitle(false);
                }
              }
            />
          </label>
          {(errorTitle) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              name="user"
              value={userId}
              onChange={
                event => {
                  setUserId(+event.target.value);
                  setErrorUser(false);
                }
              }
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {(errorUser) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
