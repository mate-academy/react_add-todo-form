import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const serverTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(serverTodos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [isNewTitle, setIsNewTitle] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
    setIsNewTitle(true);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.target.value));
    setIsUserSelected(true);
  };

  const resetTodo = () => {
    setIsNewTitle(true);
    setIsUserSelected(true);
    setSelectedUser(0);
    setNewTodoTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoTitle.trim() === '') {
      setIsNewTitle(false);
    }

    if (selectedUser === 0) {
      setIsUserSelected(false);
    }

    if (selectedUser !== 0 && newTodoTitle.trim() !== '') {
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: prevTodos
              .map(({ id }) => id)
              .reduce((a, b) => Math.max(a, b), 0) + 1,
            title: newTodoTitle,
            completed: false,
            userId: selectedUser,
            user: getUser(selectedUser),
          },
        ];
      });

      resetTodo();
    }
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
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={handleChangeTitle}
          />
          {isNewTitle || <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUser}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {isUserSelected
            || <span className="error">Please choose a user</span>}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
