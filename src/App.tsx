import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | null;
}

export const App: React.FC = () => {
  const normalizedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }));

  const [todos, setTodos] = useState<Todo[]>(normalizedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    if (hasUserError) {
      setHasUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserError(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    const newTodoId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newTodoId,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: usersFromServer.find(user => user.id === Number(userId)) || null,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter todo title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
