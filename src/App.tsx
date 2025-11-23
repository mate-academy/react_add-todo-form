import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

const fallbackUser = {
  id: 0,
  name: 'Unknown',
  username: 'unknown',
  email: '',
};

const preparedTodosList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || fallbackUser,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodosList);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userName, setUserName] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value.replace(
      /[^A-Za-z0-9\u0400-\u04FF ]+/g,
      '',
    );

    setTitle(currentValue);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    if (!title) {
      setHasTitleError(true);
      isValid = false;
    }

    if (!userName || userName === 0) {
      setHasUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;
    const currentUser: User =
      usersFromServer.find(user => user.id === userName) || fallbackUser;

    const newTodo: Todo = {
      id: maxId + 1 || 1,
      title: title,
      completed: false,
      userId: userName && isValid ? currentUser.id : 0,
      user: currentUser || fallbackUser,
    };

    if (currentUser) {
      setTodos(prev => [...prev, newTodo]);
    }

    setTitle('');
    setUserName(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            data-cy="userSelect"
            id="select"
            value={userName}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
