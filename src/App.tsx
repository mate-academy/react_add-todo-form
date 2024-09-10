import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const todosWithUsers = todosFromServer
    .map(todo => {
      const user = usersFromServer.find(user => user.id === todo.userId);
      return user ? { ...todo, user } : null;
    })
    .filter((todo): todo is Todo => todo !== null);

  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [errors, setErrors] = useState({ title: '', userId: '' });

  const handleAddTodo = () => {
    const newErrors = { title: '', userId: '' };

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (userId === 0) {
      newErrors.userId = 'Please choose a user';
    }

    setErrors(newErrors);

    if (newErrors.title || newErrors.userId) {
      return;
    }

    const user = usersFromServer.find(u => u.id === userId);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      userId,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: '' });
            }}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              setErrors({ ...errors, userId: '' });
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userId && <span className="error">{errors.userId}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
