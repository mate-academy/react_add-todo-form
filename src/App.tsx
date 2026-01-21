import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

export function getAllTodos(): Todo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getAllTodos());
  const users = usersFromServer;
  const [newTitle, setNewTitle] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<number>(0);

  const [titleError, setTitleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  function handleTitleChanged(newTodoTitle: string) {
    setNewTitle(newTodoTitle);
    setTitleError('');
  }

  function handleUserSelectChanged(userId: number) {
    setSelectedUser(userId);
    setUserError('');
  }

  function reset() {
    setNewTitle('');
    setSelectedUser(0);
    setTitleError('');
    setUserError('');
  }

  function getNewId(): number {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    let hasError = false;

    if (!newTitle) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (!selectedUser) {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTodo: Todo = {
      id: getNewId(),
      title: newTitle,
      completed: false,
      userId: selectedUser,
      user: getUserById(selectedUser),
    };

    setTodos([...todos, newTodo]);
    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={event => handleTitleChanged(event.target.value)}
          />
          <span className="error">{titleError}</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => handleUserSelectChanged(+event.target.value)}
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

          <span className="error">{userError}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
