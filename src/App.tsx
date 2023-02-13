import { useState } from 'react';
import './App.scss';
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
  const [selectedUserId, setselectedUserId] = useState(0);
  const [newTodos, setNewTodos] = useState(todos);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedUserId(+event.target.value);
    setSelectError(false);
  };

  const clearForm = () => {
    setInputTitle('');
    setselectedUserId(0);
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!inputTitle);
    setSelectError(!selectedUserId);

    const newTodoId = Math.max(...newTodos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newTodoId,
      title: inputTitle,
      userId: selectedUserId,
      completed: false,
      user: getUser(selectedUserId),
    };

    if (inputTitle && selectedUserId) {
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
              value={selectedUserId}
              onChange={handleSelect}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
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
