import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { TodoWithUser } from './types/TodoWithUser';
import { getUserById } from './servises/user';

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [userId, setUserId] = useState(0);

  const [hasUserError, setHasUserError] = useState(false);

  function getNewTodoId(todosArr: Todo[]) {
    const maxId = Math.max(
      ...todosArr.map(todo => todo.id),
    );

    return maxId + 1;
  }

  const onSubmit = (todo: TodoWithUser) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      title,
      id: 0,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
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
            {'Title: '}
          </label>
          <input
            id="title"
            name="title"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
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
            {'User: '}
          </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((userFromServer) => (
              <option
                value={userFromServer.id}
                key={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>
          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
