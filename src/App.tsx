import './App.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const findUserById = (userId: number) => {
  return usersFromServer.find(usr => usr.id === userId);
};

const getPreparedTodos = () => {
  return todosFromServer.map(todo => {
    return {
      ...todo,
      user: findUserById(todo.userId) || null,
    };
  });
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getPreparedTodos());
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [titleInputError, setTitleInputError] = useState(false);
  const [userSelectError, setUserSelectError] = useState(false);

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
    setTitleInputError(false);
    setUserSelectError(false);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    setTitleInputError(!title);
    setUserSelectError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    setTodos(currentTodos => {
      const newId = Math.max(...currentTodos.map(todo => todo.id)) + 1;

      const user = findUserById(selectedUserId);

      const newTodo: Todo = {
        id: newId,
        title: title,
        userId: selectedUserId,
        completed: false,
        user: user || null,
      };

      return [...currentTodos, newTodo];
    });

    reset();
  }

  function handleTitleInput(event: ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value.trimStart());
    setTitleInputError(false);
  }

  function handleUserSelect(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedUserId(Number(event.target.value));
    setUserSelectError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleInput}
            placeholder="title"
          />
          {titleInputError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            onChange={handleUserSelect}
            value={selectedUserId}
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
          {userSelectError && (
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
