import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { ChangeEvent, FormEvent } from 'react';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [errors, setErrors] = useState<{ title?: string; userId?: string }>({});
  const users: User[] = usersFromServer.map(user => ({
    id: String(user.id),
    username: user.name,
    email: user.email,
  }));

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const titleNew = formData.get('title')?.toString().trim() || '';
    const userId = formData.get('userId')?.toString().trim() || '';
    const newErrors: { title?: string; userId?: string } = {};
    const maxid = Math.max(...todos.map(todo => Number(todo.id)));
    const idNew = String(maxid) === '-Infinity' ? '1' : String(maxid + 1);

    if (titleNew.length !== 0) {
      newErrors.title = 'Please enter a title';
    }

    if (!userId) {
      newErrors.userId = 'Please choose a user';
    }

    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);

      return;
    }

    const newTodo: Todo = {
      id: idNew,
      title: titleNew,
      completed: false,
      userId: userId,
      user: users.find(user => user.id === userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setErrors({});
    setSelectedUserId('');
    setTitle('');
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, title: undefined }));
    setTitle('');
  }

  function handleUserChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedUserId(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, userId: undefined }));
    setSelectedUserId('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleSubmit}
        noValidate
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <label className="FormLabel" htmlFor="title">
            Title
          </label>

          <input
            data-cy="titleInput"
            className="FormInput"
            id="title"
            name="title"
            type="text"
            placeholder="Enter a title"
            required
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
          {errors.userId && <span className="error">{errors.userId}</span>}
        </div>

        <div className="field">
          <label className="FormLabel" htmlFor="userId">
            User
          </label>

          <select
            data-cy="userSelect"
            className="FormInput"
            id="userId"
            name="userId"
            required
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userId && (
            <span className="error" role="alert">
              {errors.userId}
            </span>
          )}
        </div>

        <button data-cy="submitButton" className="FormButton" type="submit">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
