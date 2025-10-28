import { useState, FormEvent, ChangeEvent } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [errors, setErrors] = useState({
    title: '',
    user: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: '',
      user: '',
    };

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (!selectedUserId) {
      newErrors.user = 'Please choose a user';
    }

    setErrors(newErrors);

    if (newErrors.title || newErrors.user) {
      return;
    }

    const maxId = Math.max(0, ...todos.map(todo => todo.id));
    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '');

    setTitle(value);
    setErrors(prev => ({ ...prev, title: '' }));
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    setErrors(prev => ({ ...prev, user: '' }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todoTitle">Title</label>
          <input
            id="todoTitle"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(currentUser => (
              <option key={currentUser.id} value={currentUser.id}>
                {currentUser.name}
              </option>
            ))}
          </select>

          {errors.user && <span className="error">{errors.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos.map(todo => ({
          ...todo,
          user: usersFromServer.find(u => u.id === todo.userId)!,
        }))}
      />
    </div>
  );
};
