import './App.scss';
import { useState } from 'react';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './api/entitis/todo';

const todosWithUsers: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  return {
    ...todo,
    user: user,
  };
});

const createNewTodoId = (current: Todo[]): number => {
  if (current.length === 0) {
    return 1;
  }

  return Math.max(...current.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const reset = () => {
    setTitleError(false);
    setUserIdError(false);
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validTitle = title.trim() !== '';
    const validUser = userId !== 0;

    const isValid = validTitle && validUser;

    if (!isValid) {
      setTitleError(!validTitle);
      setUserIdError(!validUser);

      return;
    }

    const newTodoId = createNewTodoId(todos);
    const selectedUser = usersFromServer.find(user => user.id === userId);

    const newTodo: Todo = {
      id: newTodoId,
      title: title.trim(),
      completed: false,
      userId: userId,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (userIdError) {
      setUserIdError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            value={title}
            type="text"
            placeholder="add title"
            data-cy="titleInput"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-input">User</label>
          <select
            id="user-input"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
