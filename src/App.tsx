// import { useState } from 'react';
import './App.scss';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';
// import { TodoList } from './components/TodoList';
// import { Todo } from './types/Todo';
// import { User } from './types/User';

// function getUserById(id: number): User | null {
//   return usersFromServer.find(user => user.id === id) || null;
// }

// function getTodosFromServer(): Todo[] {
//   return todosFromServer.map(todo => ({
//     ...todo,
//     user: getUserById(todo.userId),
//   }));
// }

export const App = () => {
  // const [todos, setTodos] = useState(getTodosFromServer());

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
            />
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select data-cy="userSelect">
              <option value="0" disabled>Choose a user</option>
            </select>
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

    </div>
  );
};
