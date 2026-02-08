import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(t => ({
      ...t,
      user: usersFromServer.find(u => u.id === t.userId) as User,
    })),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = title.trim();
    const sanitized = trimmed.replace(/[^a-zA-Z0-9 ]+/g, '');

    let hasError = false;

    if (!sanitized) {
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

    const nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const uid = Number(userId);
    const user = usersFromServer.find(u => u.id === uid) as User;

    const newTodo: Todo = {
      id: nextId,
      title: sanitized,
      completed: false,
      userId: uid,
      user,
    };

    setTodos([newTodo, ...todos]);
    setTitle('');
    setUserId('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAdd}>
        <div className="field">
          <label>
            Title
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter todo title"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (titleError) {
                  setTitleError(false);
                }
              }}
            />
          </label>

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User
            <select
              data-cy="userSelect"
              value={userId}
              onChange={e => {
                setUserId(e.target.value);
                if (userError) {
                  setUserError(false);
                }
              }}
            >
              <option value="">Choose a user</option>
              {usersFromServer.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
