import './App.scss';
import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

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
  user: User;
}

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({ title: false, user: false });

  useEffect(() => {
    setUsers(usersFromServer);
    setTodos(
      todosFromServer.map(todoItem => ({
        ...todoItem,
        user: usersFromServer.find(user => user.id === todoItem.userId)!,
      }))
    );
  }, []);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrors(prev => ({ ...prev, title: false }));
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setErrors(prev => ({ ...prev, user: false }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasTitle = title.trim() !== '';
    const hasUser = userId !== '';

    setErrors({ title: !hasTitle, user: !hasUser });
    if (!hasTitle || !hasUser) {
      return;
    }

    const newId = todos.length
      ? Math.max(...todos.map(todoItem => todoItem.id)) + 1
      : 1;

    const user = users.find(u => u.id === Number(userId));

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: newId,
      title,
      userId: user.id,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
    setErrors({ title: false, user: false });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="field">
          <label htmlFor="title">Title</label>
          <div className={`control has-icons-right`}>
            <input
              id="title"
              className={`input ${errors.title ? 'is-danger' : ''}`}
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter todo title"
              aria-invalid={errors.title}
            />
            {errors.title && (
              <span className="icon is-small is-right has-text-danger">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            )}
          </div>
          {errors.title && (
            <span className="help is-danger">Please enter a title</span>
          )}
        </div>

        {/* User Select Field */}
        <div className="field">
          <label htmlFor="user">User</label>
          <div className={`control has-icons-right`}>
            <div className={`select ${errors.user ? 'is-danger' : ''}`}>
              <select
                id="user"
                data-cy="userSelect"
                value={userId}
                onChange={handleUserChange}
                aria-invalid={errors.user}
              >
                <option value="">Choose a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.user && (
              <span className="icon is-small is-right has-text-danger">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            )}
          </div>
          {errors.user && (
            <span className="help is-danger">Please choose a user</span>
          )}
        </div>

        {/* Buttons */}
        <div className="buttons">
          <button type="submit" data-cy="submitButton">
            Add
          </button>
          <button
            type="reset"
            data-cy="cancelButton"
            onClick={() => {
              setTitle('');
              setUserId('');
              setErrors({ title: false, user: false });
            }}
          >
            Cancel
          </button>
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
