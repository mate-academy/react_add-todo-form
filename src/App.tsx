import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Types/Todo';
import { User } from './Types/User';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => userId === user.id)
    || null;
};

const initialTodos = todosFromServer.map((todo) => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  return { ...todo, user };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  // #region handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };
  // #endregion

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const reset = () => {
    setUserId(0);
    setTitle('');

    setHasUserIdError(false);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const maxId = Math.max(...todos.map((todo) => todo.id));

    addTodo({
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId) || null,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todoges"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="post-title">Title:  </label>
          <input
            id="post-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">  Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-user">User:  </label>
          <select
            data-cy="userSelect"
            id="post-user"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}

              >
                {user.name}
              </option>
            ))}

          </select>
          {hasUserIdError && (
            <span className="error">  Please choose a user</span>
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
