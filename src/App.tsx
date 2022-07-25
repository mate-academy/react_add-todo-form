import './App.scss';
import { useEffect, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

const getUser = (userId: number) => {
  const foundUser = usersFromServer.find(user => (
    user.id === userId
  ));

  return foundUser || null;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserIdError, setUserIdError] = useState(false);

  useEffect(() => {
    setTodos(
      todosFromServer.map(todo => ({
        ...todo,
        user: getUser(todo.userId),
      })),
    );
  }, []);

  const addTodo = (newTitle: string, newUserId: number) => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title: newTitle,
      userId: newUserId,
      completed: false,
      user: getUser(newUserId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo(title, userId);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserIdError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

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
