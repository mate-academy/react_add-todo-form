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

    const trimmedTitle = newTodo.title.trim();

    if (!trimmedTitle || newTodo.userId === 0) {
      setErrors({
        title: trimmedTitle === '',
        userId: newTodo.userId === 0,
      });

      return;
    }

    const findUser = users.find(user => user.id === newTodo.userId);

    if (!findUser) {
      return;
    }

    const newTask = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: trimmedTitle,
      completed: false,
      findUser,
      userId: findUser,
    };

    setTodos(prevTodos => [...prevTodos, newTask]);
    setNewTodo({ title: '', userId: 0 });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
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

        <button
          type="submit"
          data-cy="submitButton"
          onChange={handleFormSubmit}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
