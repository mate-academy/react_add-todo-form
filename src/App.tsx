import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './react-app-env';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [user, setUser] = useState<User | null>(null);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [title, setTitle] = useState('');
  const newId = Math.max(...todos.map(({ id }) => id));

  const onTitleChange = (el: React.FormEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(el.currentTarget.value);
  };

  const onUserChange = (el: React.FormEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUser(getUserById(+el.currentTarget.value));
  };

  const addTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (!title.trim() || !user) {
      return;
    }

    const newTodo: Todo = {
      id: newId + 1,
      userId: user ? user.id : -1,
      title,
      completed: false,
      user,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setUser(null);
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={onTitleChange}
            value={title}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user?.id || '0'}
            onChange={onUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(someUser => (
              <option
                value={someUser.id}
              >
                {someUser.name}
              </option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
