import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import TodoList from './components/TodoList/TodoList';
import { User } from './Types/User';
import { Todo } from './Types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const users: User[] = usersFromServer;
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyUser, setEmptyUser] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUser, setNewUser] = useState(0);

  function getNewTodoId() {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  }

  const validFormUser = () => (newUser
    ? (setEmptyUser(false), false) : (setEmptyUser(true), true));

  const validFormTitle = () => (newTitle
    ? (setEmptyTitle(false), false) : (setEmptyTitle(true), true));

  const addTodo = () => {
    if (!validFormTitle() && !validFormUser()) {
      const newTodo = {
        id: getNewTodoId(),
        title: newTitle,
        userId: newUser,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }
  };

  const reset = () => {
    if (validFormTitle()) {
      setNewTitle('');
    }

    if (validFormUser()) {
      setNewUser(0);
    }

    if (!validFormTitle() && !validFormUser()) {
      setNewUser(0);
      setNewTitle('');
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    validFormTitle();
    validFormUser();
    addTodo();
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submitHandler}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              setEmptyTitle(false);
            }}
          />
          {emptyTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={newUser}
            onChange={(e) => {
              setNewUser(+e.target.value);
              setEmptyUser(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {emptyUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">Add</button>
      </form>
      <TodoList todos={todos} users={users} />
    </div>
  );
};
