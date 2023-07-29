import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTittle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectUserId, setSelectUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTittle(event.target.value);
    setHasTitleError(false);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const reset = () => {
    setTittle('');
    setHasTitleError(false);
    setSelectUserId(0);
    setHasUserIdError(false);
  };

  const maxId = Math.max(...todos.map(todo => todo.id));
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!selectUserId);

    if (!title.trim() || !selectUserId) {
      return;
    }

    addTodo({
      id: maxId + 1,
      userId: selectUserId,
      title,
      completed: false,
      user: getUser(selectUserId),
    });

    reset();
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
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            placeholder="Enter title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectUserId}
            onChange={handleChangeUser}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>
          {hasUserIdError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={hasTitleError || hasUserIdError}
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
