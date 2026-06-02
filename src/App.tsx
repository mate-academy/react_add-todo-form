import React, { useState } from 'react';

import { TodoList } from './components/TodoList/TodoList';

import initialTodos from './api/todos';
import initialUsers from './api/users';

import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [users] = useState<User[]>(initialUsers);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (userId === 0) {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsSubmitting(true);

    const currentTodoUser = users.find(user => user.id === userId);
    const nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const newTodo: Todo = {
      id: nextId,
      title: title.trim(),
      userId: userId,
      completed: false,
      user: currentTodoUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
    setIsSubmitting(false);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Add Todo Form</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="todo-title">
              Title
            </label>
            <div className="control">
              <input
                id="todo-title"
                data-cy="titleInput"
                className="input"
                type="text"
                placeholder="Enter todo title"
                value={title}
                onChange={handleTitleChange}
                disabled={isSubmitting}
              />
            </div>
            {titleError && <span className="error">{titleError}</span>}
          </div>

          <div className="field">
            <label className="label" htmlFor="todo-user">
              User
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="todo-user"
                  data-cy="userSelect"
                  value={userId}
                  onChange={handleUserChange}
                  disabled={isSubmitting}
                >
                  <option value="0">Choose a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {userError && <span className="error">{userError}</span>}
          </div>

          <button
            type="submit"
            data-cy="submitButton"
            className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}
            disabled={isSubmitting}
          >
            Add Todo
          </button>
        </form>

        <hr />

        <div className="block">
          <h2 className="subtitle">Todo list</h2>
          <TodoList todos={todos} users={users} />
        </div>
      </div>
    </div>
  );
};
