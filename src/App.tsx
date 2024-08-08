import './App.scss';
import { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { NewTodo } from './types/NewTodo';
import { TodoList } from './components/TodoList';
import { CreateNewTodo } from './components/NewTodoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getPreparedTodos(todos: Todo[], users: User[]) {
  return todos.map(todo => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    };
  });
}

function getBiggestId(arr: Todo[]) {
  return Math.max(...arr.map(item => item.id));
}

export const App = () => {
  const [todos, setTodos] = useState(
    getPreparedTodos(todosFromServer, usersFromServer),
  );

  const addTodo = (newTodo: NewTodo) => {
    setTodos(current => [
      ...current,
      {
        ...newTodo,
        id: getBiggestId(current) + 1,
        user: usersFromServer.find(user => user.id === newTodo.userId),
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <CreateNewTodo addTodo={addTodo} users={usersFromServer} />

      {/* <form onSubmit={addTodo} action="/api/todos" method="POST">
        <div className="field">
          <input type="text" data-cy="titleInput" />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value="0" disabled>
              Choose a user
            </option>
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form> */}

      <TodoList todos={todos} />
    </div>
  );
};
