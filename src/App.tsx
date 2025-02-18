import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const currentTodos: Todo[] = todosFromServer.map(todo => {
  const newProperty = usersFromServer.find(user => user.id === todo.userId);

  return {
    ...todo,
    email: newProperty?.email || '',
    name: newProperty?.name || '',
  };
});

export const App = () => {
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const [title, setTitle] = useState('');
  const [select, setSelect] = useState(0);

  const [todos, setTodos] = useState<Todo[]>(currentTodos);

  const addTodo = () => {
    const selectedUser = usersFromServer.find(user => user.id === select);

    if (!selectedUser) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      userId: select,
      completed: false,
      email: selectedUser.email,
      name: selectedUser.name,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setSelect(0);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(+event.target.value);
    setSelectError(false);
  };

  const checkForErrors = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserNotSelected = select === 0;

    setTitleError(isTitleEmpty);
    setSelectError(isUserNotSelected);

    if (!isTitleEmpty && !isUserNotSelected) {
      addTodo();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={checkForErrors}>
        <div className="field">
          <label htmlFor="form-title">Title: </label>
          <input
            type="text"
            id="form-title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="form-select">User: </label>
          <select
            data-cy="userSelect"
            value={select}
            onChange={handleSelect}
            id="form-select"
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
