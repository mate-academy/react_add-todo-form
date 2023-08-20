import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/User';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map((todo) => {
  return {
    user: getUserById(todo.userId),
    ...todo,
  };
});

export const App = () => {
  const [listTodos, setListTodos] = useState(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [select, setSelect] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  const addNewTodo = () => {
    const listTodoId = listTodos.map((todo: Todo) => todo.id);
    const mewMaxId = Math.max(...listTodoId) + 1;

    const newTodo: Todo = {
      id: mewMaxId,
      title,
      userId: select,
      completed: false,
      user: getUserById(select),
    };

    setListTodos((currentListTodos) => [...currentListTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(+event.target.value);
    setHasSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title.trim());

    setHasSelectError(select === 0);

    if (!select || !title) {
      return;
    }

    addNewTodo();

    setTitle('');
    setSelect(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={select}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={listTodos} />
    </div>
  );
};
