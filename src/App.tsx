import './App.scss';
import { ChangeEvent, useState, FormEvent } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User, Todo } from './types/types';

export const currentTodos = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId) || null;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectedUserError, setSelectedUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(currentTodos);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setHasTitleError(false);
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUser(event.target.value);
    setSelectedUserError(false);
  }

  function handleSubmitButton(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let isError = false;

    if (!title.trim()) {
      setHasTitleError(true);
      isError = true;
    }

    if (!selectedUser) {
      setSelectedUserError(true);
      isError = true;
    }

    if (isError) {
      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newId,
      title: title,
      completed: false,
      userId: selectedUser ? parseInt(selectedUser, 10) : null,
      user:
        usersFromServer.find(u => u.id === parseInt(selectedUser, 10)) || null,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setSelectedUser('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmitButton}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUser}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => {
              return (
                <option key={user.id} value={user.id.toString()}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {selectedUserError && (
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
