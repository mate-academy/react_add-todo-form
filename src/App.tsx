import { FormEvent, useState } from 'react';

import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import type { Todo } from './components/TodoInfo';

const getInitialTodos = (): Todo[] => {
  return todosFromServer.map((todo) => ({
    ...todo,
    user: usersFromServer.find((user) => user.id === todo.userId) || usersFromServer[0],
  }));
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const hasTitle = trimmedTitle.length > 0;
    const hasUser = selectedUserId !== '';

    setTitleError(hasTitle ? '' : 'Please enter a title');
    setUserError(hasUser ? '' : 'Please choose a user');

    if (!hasTitle || !hasUser) {
      return;
    }

    const selectedUser = usersFromServer.find(
      (user) => user.id === Number(selectedUserId),
    );

    if (!selectedUser) {
      return;
    }

    const nextTodoId =
      todos.length === 0
        ? 1
        : Math.max(...todos.map((todo) => todo.id)) + 1;

    const newTodo: Todo = {
      id: nextTodoId,
      title: trimmedTitle,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setTitleError('');
    setUserError('');
  };

  const handleTitleChange = (value: string) => {
    const sanitizedValue = value.replace(/[^A-Za-zА-Яа-я0-9 ]/g, '');

    setTitle(sanitizedValue);

    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (value: string) => {
    setSelectedUserId(value);

    if (userError) {
      setUserError('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            value={selectedUserId}
            onChange={(event) => handleUserChange(event.target.value)}
            data-cy="userSelect"
          >
            <option value="">Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
