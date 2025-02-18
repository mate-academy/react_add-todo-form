import { useState } from 'react';
import './App.scss';
import { User } from './types/User';
import { Todos } from './types/Todos';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todoId: Todos[]) {
  const maxTodoId = Math.max(...todoId.map(todo => todo.id));

  return maxTodoId + 1;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isUserIdError, setIsUserIdError] = useState(false);

  const [todoList, setTodoList] = useState<Todos[]>(initialTodos);
  const newId = getNewTodoId(todoList);

  const userIdChanger = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserIdError(false);
  };

  const titleChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleReset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsUserIdError(!userId);

    setIsTitleError(!title.trim());
    setIsUserIdError(!userId);

    if (!userId || !title.trim()) {
      return;
    }

    setTodoList([
      ...todoList,
      {
        id: newId,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      },
    ]);

    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={titleChanger}
              onSubmit={handleSubmit}
            />
          </label>
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User
            <select
              data-cy="userSelect"
              value={userId}
              onChange={userIdChanger}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
