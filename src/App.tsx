import './App.scss';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User, Todo } from './types';

const findUserId = (userId: number) =>
  usersFromServer.find(user => user.id === userId);

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: findUserId(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const handleAddTodo = (event: FormEvent) => {
    event.preventDefault();

    setTitleError(false);
    setUserError(false);

    if (!title.trim()) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (title.trim() && userId !== 0) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        user: findUserId(userId),
        userId,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add TODO Form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter TODO title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setUserId(Number(e.target.value));
              setUserError(false);
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
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
