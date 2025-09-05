import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { useState } from 'react';

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId)!;

    return { ...todo, user };
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errors, setErrors] = useState({ title: '', user: '' });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
    if (errors.user) {
      setErrors(prev => ({ ...prev, user: '' }));
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; user?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (!selectedUserId) {
      newErrors.user = 'Please choose a user';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));

      return;
    }

    const maxId = todos.reduce((max, t) => Math.max(max, t.id), 0);
    const user: User = usersFromServer.find(
      u => u.id === parseInt(selectedUserId),
    )!;

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId: user.id,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setErrors({ title: '', user: '' });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAdd}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          {errors.user && <span className="error">{errors.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
