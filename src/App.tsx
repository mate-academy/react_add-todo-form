import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App = () => {
  function getUserById(userId: number) {
    return usersFromServer.find(user => user.id === userId)
    || null;
  }

  const initialTodos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitle, setHasTitle] = useState(false);
  const [hasUserId, setHasUserId] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const getMaxTodoId = () => {
    return Math.max(...todos.map(todo => todo.id), 0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setHasTitle(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    setHasUserId(false);
  };
  //

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitle(!title);
    setHasUserId(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: getMaxTodoId() + 1,
      title,
      userId,
      user: getUserById(userId),
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
    setHasTitle(false);
    setHasUserId(false);
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
          <label htmlFor="title">
            Title:
            <input
              name="title"
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
            {hasTitle && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label htmlFor="select">
            User:
            <select
              name="select"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {hasUserId && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
