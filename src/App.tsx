import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { PreparedTodo, User } from './react-app-env';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => {
  return users.find(person => person.id === userId) || null;
};

const preparedTodos: PreparedTodo[] = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const App: React.FC = () => {
  const [listPreparedTodos, setListPreparedTodos]
    = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newObjTodo = {
      id: Date.now(),
      title,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
      completed: false,
    };

    setListPreparedTodos((currentPreparedTodos) => {
      return [...currentPreparedTodos, newObjTodo];
    });
  };

  return (
    <div className="App">
      <h1>{title}</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter Title here"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <select
          name="users"
          value={selectedUserId}
          onChange={(event) => {
            setSelectedUserId(+event.target.value);
          }}
        >
          <option
            value="Choose a User"
            disabled
          >
            Choose a User
          </option>

          {users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
        >
          Add
        </button>
      </form>

      <section>
        <TodoList prepTodos={listPreparedTodos} />
      </section>
    </div>
  );
};

export default App;
