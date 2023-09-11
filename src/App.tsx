import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !userId) {
      setTitleError(!title);
      setUserError(!userId);

      return;
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      userId,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitleError(false);
              setTitle(event.target.value);
            }}
            placeholder="Add todo"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId || ''}
            onChange={(event) => {
              setUserError(false);
              setUserId(Number(event.target.value));
            }}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>{user.name}</option>
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
