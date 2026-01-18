import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const user = usersFromServer.find(user => user.id === userId)!;

    const nextId = todos.length
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1;

    const newTodo: Todo = {
      id: nextId,
      title,
      userId,
      completed: false,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (value: string) => {
    // optional restriction
    const filtered = value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

    setTitle(filtered);
    setTitleError(false);
  };

  const handleUserChange = (value: number) => {
    setUserId(value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Todo Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={event => handleTitleChange(event.target.value)}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">Select User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={event => handleUserChange(Number(event.target.value))}
          >
            <option value={0}>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
