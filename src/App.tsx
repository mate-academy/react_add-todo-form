import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUser, setSelectedUser]
    = useState<number>(0);
  const [userError, setUserError] = useState(false);

  const pushUser = (todo: Todo) => {
    setCurrentTodos(currentTodo => [...currentTodo, todo]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTitle(value);
    setTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSelectedUser(+value);
    setUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setSelectedUser(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (title && selectedUser) {
      pushUser({
        id: Math.max(...todos.map(({ id }) => id)) + 1,
        title,
        completed: false,
        userId: 0,
        user: getUser(selectedUser),
      });

      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
            {titleError && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value={0} disabled>Choose a user</option>
              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
