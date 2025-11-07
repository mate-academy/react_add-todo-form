import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/Types/types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errors, setErrors] = useState<{ title?: string; user?: string }>({});

  const clearError = (field: 'title' | 'user') => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleAddTodo = (event: FormEvent) => {
    event.preventDefault();
    let hasError = false;
    const newErrors: { title?: string; user?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
      hasError = true;
    }

    if (!selectedUserId) {
      newErrors.user = 'Please choose a user';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);

      return;
    }

    const numbericUserId = Number(selectedUserId);
    const selectedUser = usersFromServer.find(
      user => user.id === numbericUserId,
    )!;

    const newTodo: Todo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      completed: false,
      userId: numbericUserId,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setErrors({});
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filteredValue = event.target.value.replace(
      /[^A-Za-zА-Яа-яЁёЇїІіЄє0-9 ]/g,
      '',
    );

    setTitle(filteredValue);
    clearError('title');
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    clearError('user');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
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
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
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
