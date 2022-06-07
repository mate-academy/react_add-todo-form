import React, { useState } from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FullTodo, Todo, User } from './react-app-env';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCompleted, setNewCompleted] = useState(false);
  const [newTodo, setNewTodo] = useState(todosFromServer);

  const preparedTodos = (
    todos: Todo[],
    users: User[],
  ): FullTodo[] => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || null,
    }));
  };

  const todos = preparedTodos(
    newTodo,
    usersFromServer,
  );

  return (
    <div className="App">
      <form onSubmit={(event) => {
        event.preventDefault();

        setNewTodo([...newTodo, {
          userId: +newUser,
          id: newTodo.length + 1,
          title: newTitle,
          completed: newCompleted,
        }]);

        setNewTitle('');
        setNewCompleted(false);
        setNewUser('');
      }}
      >
        <label
          className="level level-left m-2"
          htmlFor="titleInput"
        >
          Title of Todo:
        </label>
        <input
          type="text"
          id="titleInput"
          className="input is-link level level-left column is-2 ml-1"
          required
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />

        <select
          name="user"
          id="selectUser"
          className="select is-link level level-left ml-1"
          required
          value={newUser}
          onChange={(event) => setNewUser(event.target.value)}
        >
          <option value="" disabled selected>Choose user</option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="completed" className="checkbox level level-left ml-2">
          <input
            type="checkbox"
            name="newCompleted"
            className="level level-left ml-2"
            id="completed"
            checked={newCompleted}
            onChange={() => setNewCompleted(!newCompleted)}
          />
          Completed
        </label>

        <button
          type="submit"
          className="button is-link level level-left ml-3"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
