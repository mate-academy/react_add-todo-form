import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoUser } from './types/todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosWithUser: TodoUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [isFormChecked, setFormChecked] = useState(false);
  const [todos, setTodos] = useState<TodoUser[]>(todosWithUser);

  const setTodoId = () => {
    const listId = todos.map(todo => todo.id);

    return Math.max(...listId) + 1;
  };

  const resetForm = () => {
    setTitleInput('');
    setUserSelect('');
    setFormChecked(false);
  };

  const addNewTodo = () => {
    const selectedUser = usersFromServer.find(user => user.id === +userSelect);

    if (!selectedUser) {
      throw new Error('no such user');
    }

    const newTodo = {
      id: setTodoId(),
      title: titleInput,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos(prevTodos => ([
      ...prevTodos,
      newTodo,
    ]));

    resetForm();
  };

  const handleSubmitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormChecked(true);

    if (titleInput && userSelect) {
      addNewTodo();
    }
  };

  const isUserSelected = isFormChecked && !userSelect;
  const isTitleFilled = isFormChecked && !titleInput;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitTodo}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              value={titleInput}
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={(event) => setTitleInput(event.target.value)}
            />
          </label>

          {isTitleFilled && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userSelect}
              onChange={(event) => setUserSelect(event.target.value)}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </label>

          {isUserSelected && (
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
