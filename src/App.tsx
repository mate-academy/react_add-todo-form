import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(id: number): User | null {
  return usersFromServer.find(user => user.id === id) || null;
}

function getTodosFromServer(): Todo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
}

function getUsersFromServer(): User[] {
  return usersFromServer.map(user => ({
    ...user,
  }));
}

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState(getTodosFromServer());
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          if (title.trim() === '' || userId === 0) {
            return;
          }

          const user = getUserById(userId);
          const todo: Todo = {
            id: Math.max(...(todos.map(curr => curr.id))) + 1,
            title,
            completed: false,
            userId,
            user,
          };

          setTodos(prevTodos => [...prevTodos, todo]);

          setUserId(0);
          setTitle('');
        }}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => setTitle(event.target.value.trim())}
            />
          </label>

          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              onChange={(event) => setUserId(+event.target.value)}
            >
              <option value={userId} disabled selected>Choose a user</option>

              {getUsersFromServer().map(currentUser => (
                <option value={currentUser.id} key={currentUser.id}>
                  {currentUser.name}
                </option>
              ))}
            </select>
          </label>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
