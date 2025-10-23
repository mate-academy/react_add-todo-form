import React, { useState } from 'react';
import todos from './api/todos';
import users from './api/users';
import './App.scss';
import { Todo } from './types/types.model';
import { TodoList } from './components/TodoList';

export const App = () => {
  const initialTodos: Todo[] = todos.map(t => {
    const user = users.find(f => f.id === t.userId)!;

    return { ...t, user };
  });

  // state
  const [todosList, setTodosList] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState({ title: '', user: '' });

  // handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (error.title) {
      setError(prevError => ({ ...prevError, title: '' }));
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    if (error.user) {
      setError(prevError => ({ ...prevError, user: '' }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newError: { title?: string; user?: string } = {};

    if (!title.trim()) {
      newError.title = 'Please enter a title';
    }

    if (!selectedUserId) {
      newError.user = 'Please choose a user';
    }

    if (Object.keys(newError).length > 0) {
      setError(t => ({ ...t, ...newError }));

      return;
    }

    const maxIdUser = todosList.reduce(
      (max, todo) => Math.max(max, todo.id),
      0,
    );
    const user = users.find(h => h.id === parseInt(selectedUserId));

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: maxIdUser + 1,
      title: title.trim(),
      userId: user.id,
      completed: false,
      user,
    };

    setTodosList(t => [...t, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setError({ title: '', user: '' });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit} className="NewTodo">
        <div className="selfit">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {error.title && <span className="error">{error.title}</span>}
        </div>
        <div className="selfit">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {error.user && <span className="error">{error.user}</span>}
        </div>

        <button type="submit">Add</button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
