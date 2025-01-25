import { FC, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import users from './api/users';
import { Todo } from './components/TodoInfo';

type NewTodo = {
  title: string;
  userId: number;
};

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [newTodo, setNewTodo] = useState<NewTodo>({ title: '', userId: 0 });
  const [errors, setErrors] = useState({ title: false, userId: false });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, title: event.target.value });
    if (errors.title) {
      setErrors({ ...errors, title: false });
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTodo({ ...newTodo, userId: Number(event.target.value) });
    if (errors.userId) {
      setErrors({ ...errors, userId: false });
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo.title.trim() === '' || newTodo.userId === 0) {
      setErrors(prevErrors => ({ ...prevErrors, title: true }));

      return;
    }

    const x: Todo = {
      ...newTodo,
      id: Math.max(...todos.map(({ id }) => id)) + 1,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, x]);
    setNewTodo({ title: '', userId: 0 });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={newTodo.title}
              onChange={handleInputChange}
            />
          </label>
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            onChange={handleSelectChange}
            value={newTodo.userId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
