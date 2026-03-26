import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { useMemo, useState } from 'react';

import { TodoWithUser } from './types';
import { TodoList } from './components/TodoList';

export const App = () => {
  const preparedTodos = useMemo(() => {
    return todosFromServer
      .map(todo => {
        const user = usersFromServer.find(
          currentUser => currentUser.id === todo.userId,
        );

        if (!user) {
          return null;
        }

        return {
          ...todo,
          user,
        };
      })
      .filter(Boolean) as TodoWithUser[];
  }, []);

  const [todos, setTodos] = useState<TodoWithUser[]>(preparedTodos);

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTitle(value);
    setTitleError(false);
  };

  // select change
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSelectedUserId(value);
    setUserError(false);
  };

  // submit форми
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    const isTitleValid = trimmedTitle !== '';
    const isUserValid = selectedUserId !== '0';

    setTitleError(!isTitleValid);
    setUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const user = usersFromServer.find(
      currentUser => currentUser.id === Number(selectedUserId),
    );

    if (!user) {
      return;
    }

    // знайти максимальний id
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    // створити новий todo
    const newTodo: TodoWithUser = {
      id: maxId + 1,
      title: trimmedTitle,
      completed: false,
      userId: user.id,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setSelectedUserId('0');

    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
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
