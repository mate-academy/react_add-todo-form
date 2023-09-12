import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(id: number) {
  return usersFromServer.find(usr => id === usr.id) || null;
}

export const App = () => {
  const initTodos = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [todo, setTodo] = useState<Todo>(
    {
      id: 0,
      title: '',
      completed: false,
      user: null,
    },
  );

  const [isFilled, setIsFilled] = useState(true);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        ...newTodo,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        id: Math.max(...(todosFromServer.map(todo => todo.id))) + 1,
      },
    ]);
  };

  const resetForm = () => {
    setTodo(
      {
        id: 0,
        title: '',
        completed: false,
        user: null,
      },
    );

    setIsFilled(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(
      { ...todo, title: event.target.value },
    );
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodo(
      {
        ...todo,
        user: getUser(Number(event.target.value)),
      },
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todo.title || !todo.user?.id) {
      setIsFilled(false);

      return;
    }

    addTodo(todo);
    resetForm();
  };

  const hasTitleError = !todo.title.trim() && !isFilled;

  const hasUserError = !todo.user && !isFilled;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
            <input
              type="text"
              value={todo.title}
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
            {hasTitleError
            && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label htmlFor="select">
            User:
            <select
              name="select"
              data-cy="userSelect"
              onChange={handleUserIdChange}
              value={!todo.user ? 0 : todo.user.id}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {hasUserError
              && (<span className="error">Please choose a user</span>)}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList
        todos={todos}
      />
    </div>
  );
};
