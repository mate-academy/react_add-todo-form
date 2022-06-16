import React, { useState } from 'react';
import './App.scss';

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

  const addTodo = (title: string, userId: number) => {
    setTodoId((prev) => prev + 1);

    const newTodo: PreparedTodos = {
      title,
      userId,
      id: todoId,
      completed: false,
      user: users.find(user => selectedUser === user.id) || null,
    };

    setInitialTodos([...initialTodos, newTodo]);
  };

  const hasValidTitle = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoTitle && selectedUser) {
      addTodo(todoTitle, selectedUser);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={hasValidTitle}
      >
        <input
          type="text"
          placeholder="Create todo"
          value={todoTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTodoTitle(event.target.value);
          }}
        />

        <select
          id="userSelect"
          value={selectedUser}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
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

        <button type="submit">Create todo</button>
      </form>

      <TodoList preparedTodos={initialTodos} />
    </div>
  );
};

export default App;
