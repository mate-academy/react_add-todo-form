import React, { useState } from 'react';
import { Todo } from './types/Todo';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [visibleTodos, setTodos] = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [isComplited, setIsComplited] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, ''));
    setHasTitleError(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim().length) {
      setHasTitleError(true);
    }

    if (!selectedUser) {
      setHasUserError(true);
    }

    if (title.trim().length && selectedUser) {
      const newTodo = {
        userId: selectedUser || 0,
        id: visibleTodos[visibleTodos.length - 1].id + 1,
        title: title.trim(),
        completed: isComplited,
        user: users.find(user => user.id === selectedUser) || null,
      };

      setTodos([...visibleTodos, newTodo]);
      setIsComplited(false);
      setTitle('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} className="add-todo" name="addTodo">
        <div className="add-todo__wrapper">
          <label className="add-todo__label">
            <input
              className="add-todo__item"
              name="todoTitle"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />

            {hasTitleError && (
              <p className="add-todo__error">Please enter the title</p>
            )}
          </label>

          <label className="add-todo__label">
            <select
              className="add-todo__item"
              name="todoUser"
              value={selectedUser}
              onChange={handleNameChange}
            >
              <option value={0} disabled>Choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {hasUserError && (
              <p className="add-todo__error">Please choose a user</p>
            )}
          </label>
        </div>

        <label className="add-todo__label add-todo__label--completed">
          Is completed?

          <input
            className="add-todo__item add-todo__item--checkbox"
            type="checkbox"
            name="todoIsCompleted"
            checked={isComplited}
            onChange={(event) => setIsComplited(event.target.checked)}
          />
        </label>

        <button type="submit" className="add-todo__submit">
          Add todo
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};

export default App;
