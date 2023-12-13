import './App.scss';
import { FC, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App: FC = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [isSelectedUserError, setIsSelectedUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!title);
    setIsSelectedUserError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: selectedUser,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="TitleForm">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="TitleForm"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="Select">User: </label>
          <select
            data-cy="userSelect"
            id="Select"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(+event.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isSelectedUserError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
