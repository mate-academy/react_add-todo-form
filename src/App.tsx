import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [handleUser, setHandleUser] = useState('0');
  const [handleTitle, setHandleTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [handleUserError, setHandleUserError] = useState(false);
  const [handleTitleError, setHandleTitleError] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandleTitle(event.target.value);
    setHandleTitleError(false);
  };

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHandleUser(event.target.value);
    setHandleUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isUserValid = handleUser === '0';
    const isTitleValid = handleTitle.trim() === '';

    setHandleUserError(isUserValid);
    setHandleTitleError(isTitleValid);

    if (isUserValid || isTitleValid) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: handleTitle,
      completed: false,
      userId: +handleUser,
    };

    setTodos([...todos, newTodo]);
    setHandleTitle('');
    setHandleUser('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            value={handleTitle}
            onChange={onTitleChange}
          />
          {handleTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>
          <select
            id="todo-user"
            data-cy="userSelect"
            value={handleUser}
            onChange={onUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {handleUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
