import './App.scss';

import { useEffect, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserIdError, setUserError] = useState(false);

  useEffect(() => {
    const preparedTodos: Todo[] = todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }));

    setTodos(preparedTodos);
  }, []);

  function addTodo(newTodoTitle: string, newUserId: number): void {
    const maxId = Math.max(...todos.map(todo => todo.id));
    const newTodo: Todo = {
      id: maxId + 1,
      title: newTodoTitle.trim(),
      userId: newUserId,
      completed: false,
      user: getUser(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTitleError(!todoTitle);
    setUserError(!userId);

    if (!todoTitle || !userId) {
      return;
    }

    addTodo(todoTitle, userId);
    setTodoTitle('');
    setUserId(0);
  }

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(onSubmit)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTitle}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            name="users"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserName}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
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
