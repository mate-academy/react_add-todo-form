import './App.scss';
import { useState, FormEvent } from 'react';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

// Types
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

type TodoFromServer = Omit<Todo, 'user'>;

const preparedTodos: Todo[] = (todosFromServer as TodoFromServer[]).map(
  todo => ({
    ...todo,
    user: (usersFromServer as User[]).find(user => user.id === todo.userId)!,
  }),
);

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
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

    const user = (usersFromServer as User[]).find(u => u.id === +userId)!;
    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: +userId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
    setTitleError(false);
    setUserError(false);
    setSubmitted(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);

    if (userError) {
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titleInput">Title</label>
        <input
          id="titleInput"
          data-cy="titleInput"
          type="text"
          placeholder="Enter todo title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && submitted && (
          <span className="error">Please enter a title</span>
        )}
        <label htmlFor="userSelect">User</label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="" disabled>
            Choose a user
          </option>
          {(usersFromServer as User[]).map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && submitted && (
          <span className="error">Please choose a user</span>
        )}
        <button type="submit">Add</button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
