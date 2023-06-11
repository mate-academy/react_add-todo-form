import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser]
  = useState< number | undefined>(undefined);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(initialTodos);
  const [userError, setUserError] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      setUserError('Please choose a user');

      return;
    }

    if (!inputValue.trim()) {
      setInputError('Please enter a title');

      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title: inputValue,
      completed: false,
      userId: selectedUser,
      user: getUser(selectedUser),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setSelectedUser(undefined);
    setUserError('');
    setInputValue('');
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = Number(e.target.value);

    setSelectedUser(selectedUserId);
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <span className="">Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputError && <span style={{ color: 'red' }}>{inputError}</span>}

        </div>

        <div className="field">
          <span className="">User: </span>

          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(person => {
              return (
                <option
                  key={person.id}
                  value={person.id}
                >
                  {person.name}
                </option>
              );
            })}
          </select>
          {userError && <span style={{ color: 'red' }}>{userError}</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />

    </div>
  );
};
