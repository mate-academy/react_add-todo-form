import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import users from './api/users';
import todos from './api/todos';
import { PreparedTodos } from './app.typedefs';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: PreparedTodos[] = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => todo.userId === user.id) || null,
  }
));

const App: React.FC = () => {
  const lastIndexOfTodos = preparedTodos.length - 1;

  const [initialTodos, setInitialTodos] = useState(preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todoId, setTodoId] = useState(preparedTodos[lastIndexOfTodos].id);
  const [hasValidTitle, setHasValidTitle] = useState(false);
  const [hasValidUser, setHasValidUser] = useState(false);

  const addTodo = (title: string, userId: number) => {
    const newTodo: PreparedTodos = {
      title,
      userId,
      id: todoId,
      completed: false,
      user: users.find(user => selectedUser === user.id) || null,
    };

    setInitialTodos([...initialTodos, newTodo]);
  };

  const validateInputs = () => {
    if (!hasValidTitle) {
      setHasValidTitle(true);
    }

    if (!hasValidUser) {
      setHasValidUser(true);
    }
  };

  const hasValidInput = (event: React.FormEvent) => {
    event.preventDefault();

    validateInputs();

    if (todoTitle && selectedUser) {
      setTodoId((prev) => prev + 1);
      addTodo(todoTitle, selectedUser);
      setTodoTitle('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={hasValidInput}
      >
        <input
          type="text"
          placeholder="Create todo"
          className={cn({ error: hasValidTitle })}
          value={todoTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setHasValidTitle(false);
            setTodoTitle(event.target.value);
          }}
        />

        <select
          id="userSelect"
          className={cn({ error: hasValidUser })}
          value={selectedUser}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setHasValidUser(false);
            setSelectedUser(+event.target.value);
          }}
        >
          <option value="0" disabled>Choose a User</option>
          {users.map(user => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        <button
          type="submit"
          className="button"
        >
          Create todo
        </button>
      </form>

      <br />
      <br />

      <TodoList preparedTodos={initialTodos} />
    </div>
  );
};

export default App;
