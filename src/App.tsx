import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App: React.FC = () => {
  const initialTodos: Todo[] = todosFromServer
    .map(t => {
      const user = usersFromServer.find(u => u.id === t.userId);

      return user ? { ...t, user } : null;
    })
    .filter((x): x is Todo => x !== null);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, sethasTitleError] = useState(false);

  const [userIdSelec, setUserIdSelec] = useState('');
  const [hasUserIdError, sethasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    sethasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserIdSelec(event.target.value);
    sethasUserIdError(false);
  };

  const handleSubimit = (event: React.FormEvent) => {
    event.preventDefault();

    sethasTitleError(!title);
    sethasUserIdError(!userIdSelec);

    if (!title || !userIdSelec) {
      return;
    }

    const maxId = Math.max(...todos.map(t => t.id), 0);
    const userId = Number(userIdSelec);
    const user = usersFromServer.find(u => u.id === userId);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    sethasTitleError(false);
    setUserIdSelec('');
    sethasUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubimit}>
        <div className="field">
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userIdSelec}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
