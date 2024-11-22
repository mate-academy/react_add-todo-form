import './App.scss';
import users from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

const initialTodos: Todo[] = todosFromServer;

function getNewTodoId(todos: Todo[]): number {
  const maxId = Math.max(...todos.map(todo => todo.id), 0);

  return maxId + 1;
}

export function getUserById(userId: number): User | null {
  return users.find(user => user.id === userId) || null;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title: title.trim(),
      userId,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            onChange={handleUserIdChange}
            value={userId}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
