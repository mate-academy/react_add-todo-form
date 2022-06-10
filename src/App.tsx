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
  const [isCompleted, setIsCompleted] = useState(false);

  const [titleIsEmpty, setTitleIsEmpty] = useState(false);
  const [selectIsEmpty, setSelectIsEmpty] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setTitleIsEmpty(true);
    }

    if (selectedUserId === 0) {
      setSelectIsEmpty(true);
    }

    if (title && selectedUserId) {
      const newObjTodo = {
        id: Date.now(),
        title,
        userId: selectedUserId,
        user: getUserById(selectedUserId),
        completed: isCompleted,
      };

      setListPreparedTodos((currentPreparedTodos) => {
        return [...currentPreparedTodos, newObjTodo];
      });

      setSelectedUserId(0);
      setTitle('');
      setIsCompleted(false);
    }
  };

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit}
        className="form"
      >

        <div
          className={`mb-4 ${titleIsEmpty && 'input-container'}`}
        >
          <input
            type="text"
            name="title"
            placeholder="Enter Title here"
            value={title}
            className={`
              input-group-text
              ${titleIsEmpty && 'border-danger'}`}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleIsEmpty(false);
            }}
          />
        </div>

        <div
          className={`mb-4 ${selectIsEmpty && 'select-container'}`}
        >
          <select
            name="users"
            value={selectedUserId}
            className={`
              form-select
              mb-4
              ${selectIsEmpty && 'border-danger'}`}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
              setSelectIsEmpty(false);
            }}
          >
            <option
              value="0"
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

          <input
            type="checkbox"
            className={`form-check-input ${!isCompleted && 'form-check-input-not-checked'}`}
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
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
