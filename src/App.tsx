import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { getUser } from './components/services/getUser';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/types/UserAndTodo';

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [option, setOption] = useState(0);
  const [userError, setUserError] = useState(false);

  const onAdd = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: Math.max.apply(null, todos.map((element) => element.id)) + 1,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  function reset() {
    setTitle('');
    setOption(0);
    setTitleError(false);
    setUserError(false);
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTitle(value);
    setTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setOption(+value);
    setUserError(false);
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTitleError(!title);
    setUserError(option === 0);

    if (title && option !== 0) {
      onAdd({
        id: 0,
        title,
        completed: false,
        userId: 0,
        user: getUser(+option),
      });

      reset();
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={option}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
