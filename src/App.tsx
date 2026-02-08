import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './api/types';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(
    currentUser => currentUser.id === todo.userId,
  )!;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [titleError, setTitleError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (!userId) {
      setUserIdError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const user = usersFromServer.find(
      currentUser => currentUser.id === userId,
    )!;

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserIdError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            type="text"
            value={title}
            placeholder="Enter todo title"
            data-cy="titleInput"
            onChange={event => {
              setTitle(event.target.value);
              setTitleError('');
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            value={userId}
            data-cy="userSelect"
            onChange={event => {
              setUserId(+event.target.value);
              setUserIdError('');
            }}
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

          {userIdError && <span className="error">{userIdError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
