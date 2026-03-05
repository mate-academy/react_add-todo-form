import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const prepareTodos = (todos: typeof todosFromServer): Todo[] => {
  return todos.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    return {
      ...todo,
      user: user!,
    };
  });
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(prepareTodos(todosFromServer));
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = changeEvent.target.value;

    // Optional: Allow only letters (ua and en), digits, and spaces
    value = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, '');

    setTitle(value);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserIdChange = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = Number(changeEvent.target.value);

    setUserId(value);

    if (userIdError) {
      setUserIdError(false);
    }
  };

  const handleSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!userId || userId === 0) {
      setUserIdError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Find the largest id and add 1
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newId = maxId + 1;

    // Find the selected user
    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (selectedUser) {
      const newTodo: Todo = {
        id: newId,
        title: title.trim(),
        userId: userId,
        completed: false,
        user: selectedUser,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId(0);
      setTitleError(false);
      setUserIdError(false);
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
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
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
