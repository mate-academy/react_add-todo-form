import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosList = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const users = usersFromServer;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosList);
  const [user, setUser] = useState<User | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!newTodo) {
      setTitleError('Please enter a title');
    }
    if (!user) {
      setUserError('Please choose a user');
    }
    if (newTodo.trim() === '' || !user) {
      return;
    }

    const maxTodoId = Math.max(...todos.map(todo => todo.id));
    const newId = maxTodoId + 1;

    const todo: Todo = {
      id: newId,
      title: newTodo,
      completed: false,
      userId: user.id,
      user: user,
    };

    setTodos([...todos, todo]);
    setUser(null);
    setNewTodo('');
    setTitleError('');
    setUserError('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodo}
            onChange={e => {
              setTitleError('');
              setNewTodo(e.target.value);
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user ? user.id : ''}
            onChange={e => {
              const userId = Number(e.target.value);
              const userById = users.find(user => user.id === userId) || null;
              setUserError('');
              setUser(userById);
            }}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
