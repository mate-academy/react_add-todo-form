import './App.scss';
import { useState, FormEvent } from 'react';
import users from './api/users';
import initialTodos from './api/todos';
import { TodoList } from './components/TodoList';

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: (typeof users)[number];
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanTitle = e.target.value
      .replace(/[^a-zA-Zа-яА-ЯґҐєЄіІїЇ0-9 ]/g, '')
      .trim();

    setTitle(cleanTitle);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isTitleValid = title !== '';
    const isUserValid = userId !== '';

    setTitleError(!isTitleValid);
    setUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id), 0);

    const selectedUser = users.find(user => user.id === +userId);

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      userId: +userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <label htmlFor="titleInput">Title:</label>
        <div className="field">
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        {titleError && <span className="error">Please enter a title</span>}

        <label htmlFor="titleInput">User:</label>
        <select
          data-cy="userSelect"
          value={userId}
          onChange={e => {
            setUserId(e.target.value);
            if (userError) {
              setUserError(false);
            }
          }}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <div className="error">Please choose a user</div>}

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} key={userId} />
    </div>
  );
};
