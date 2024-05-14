import './App.scss';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodosWithUser } from './types/ToDosWithUser';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUsers: TodosWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getTodoId = (todos: TodosWithUser[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [failedTitle, setTitleFailed] = useState(false);
  const [failedUser, setUserFailed] = useState(false);
  const [todos, setTodos] = useState(todosWithUsers);

  const resetForm = () => {
    setUserId(0);
    setTitle('');
    setUserFailed(false);
    setTitleFailed(false);
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setTitle(event.target.value);
    setTitleFailed(false);
  };

  const handleUserChange: ChangeEventHandler<HTMLSelectElement> = event => {
    setUserId(+event.target.value);
    setUserFailed(false);
  };

  const formSubmit: FormEventHandler = event => {
    event.preventDefault();

    const trimedTitle = title.trim();

    setUserFailed(!userId);
    setTitleFailed(!trimedTitle);

    if (!trimedTitle || !userId) {
      return;
    }

    const newTodo: TodosWithUser = {
      id: getTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={formSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            pattern="[A-Za-z0-9\s]+"
          />
          {failedTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userDropdown">User: </label>
          <select
            data-cy="userSelect"
            id="userDropdown"
            name="userDropdown"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {failedUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
