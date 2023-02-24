import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number) {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectUserId, setSelectedUserId] = useState(0);
  const [newTodos, setNewTodos] = useState(todos);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectError(false);
  };

  const clearForm = () => {
    setInputTitle('');
    setSelectedUserId(0);
  };

  function isNotEmptyString(string: string) {
    return string.trim().length > 0;
  }

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!inputTitle);
    setSelectError(!selectUserId);

    const newTodoId = Math.max(...newTodos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newTodoId,
      title: inputTitle,
      completed: false,
      userId: selectUserId,
      user: getUser(selectUserId),
    };

    if (!isNotEmptyString(inputTitle)) {
      setTitleError(true);
    }

    if (inputTitle && selectUserId && isNotEmptyString(inputTitle)) {
      setNewTodos([...newTodos, newTodo]);
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={inputTitle}
              onChange={handleTitle}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectUserId}
              onChange={handleSelect}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
