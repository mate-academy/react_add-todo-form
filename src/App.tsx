import { useState } from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App = () => {
  // Безопасная подготовка todos: отфильтровываем те, у кого нет пользователя
  const preparedTodos: Todo[] = todosFromServer
    .map(todoFromServer => {
      const foundUser = users.find(user => user.id === todoFromServer.userId);

      if (!foundUser) {
        return null;
      }

      return {
        ...todoFromServer,
        user: foundUser,
      };
    })
    .filter((todo): todo is Todo => todo !== null);

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // userId гарантированно валиден после проверки
    const selectedUser = users.find(user => user.id === userId)!;

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={event => {
              const filtered = event.target.value.replace(
                /[^a-zA-Zа-яА-ЯіІїЇєЄ0-9\s]/g,
                '',
              );
              setTitle(filtered);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
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
