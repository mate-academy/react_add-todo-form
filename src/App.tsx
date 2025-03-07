import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

const preparedTodo = () => {
  return todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }));
};

const generateTodoId = (todos: Todo[]) => {
  return (todos.length ? Math.max(...todos.map(todo => todo.id)) : 0) + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodo());
  const [title, setTitle] = useState('');
  const [select, setSelect] = useState('0');
  const [titleHasError, setTitleHasError] = useState(false);
  const [selectHasError, setSelectHasError] = useState(false);

  const handleInput = (value: string) => {
    setTitle(value);
    setTitleHasError(!value.trim());
  };

  const handleSelect = (value: string) => {
    setSelect(value);
    setSelectHasError(value === '0');
  };

  const reset = () => {
    setSelect('0');
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = !title.trim();
    const isSelectEmpty = select === '0';

    setTitleHasError(isTitleEmpty);
    setSelectHasError(isSelectEmpty);

    if (isTitleEmpty || isSelectEmpty) {
      return;
    }

    setTodos((currentTodos: Todo[]) => [
      ...currentTodos,
      {
        id: generateTodoId(currentTodos),
        title,
        completed: false,
        userId: Number(select),
        user: usersFromServer.find(user => user.id === Number(select)) || null,
      },
    ]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Add title"
            value={title}
            onChange={event => handleInput(event.target.value)}
          />
          {titleHasError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={select}
            onChange={event => handleSelect(event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {[...usersFromServer].map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectHasError && (
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
