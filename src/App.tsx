import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './api/types';

const createNewId = (currentTodos: Todo[]) => {
  return (Math.max(...currentTodos.map(todo => todo.id)) + 1);
};

const findUser = (currentId: number) => {
  return usersFromServer.find(user => user.id === currentId) || null;
};

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const [currentTodoList, setCurrentTodoList]
    = useState<Todo[]>(todosWithUsers);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserError(true);
    }

    if (title && userId) {
      const newTodo: Todo = {
        id: createNewId(currentTodoList),
        title,
        completed: false,
        userId,
        user: findUser(userId),
      };

      setCurrentTodoList((currentTodos) => [...currentTodos, newTodo]);

      setTitle('');
      setUserId(0);
    }
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
          <label
            htmlFor="title"
          >
            Title:&nbsp;
          </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="user"
          >
            User:&nbsp;
          </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodoList} />
    </div>
  );
};
