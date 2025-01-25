import { FC, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import users from './api/users';
import { Todo } from './components/TodoInfo';

type NewTodo = {
  title: string;
  userId: number;
};

export const App: FC = () => {
  const normalizedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(normalizedTodos);
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

    const foundUser = users.find(user => user.id === newTodo.userId);

    if (!foundUser) {
      return;
    }

    const newTask: Todo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: trimmedTitle,
      completed: false,
      user: foundUser,
      userId: foundUser.id,
    };

    setTodos(prevTodos => [...prevTodos, newTask]);
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
