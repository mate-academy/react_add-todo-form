import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosList: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App : React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>(todosList);
  const [titleName, setTitleName] = useState('');
  const [selectedUserId, setSelectedUserID] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  // const idForNewTodo = Math.max(...todos.map(todo => todo.id)) + 1;
  const maxTodoId = Math.max(...todos.map(todo => todo.id));
  let idForNewTodo = maxTodoId + 1;

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleName(event.target.value);
    setTitleError(false);
  };

  const handleUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserID(+event.target.value);
    setUserError(false);
  };

  const resetForm = () => {
    setTitleName('');
    setSelectedUserID(0);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setTitleError(titleName.trim().length === 0);
    setUserError(!selectedUserId);

    const newTodo: Todo = {
      id: idForNewTodo,
      title: titleName,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
      completed: false,
    };

    if (titleName.trim().length !== 0 && selectedUserId) {
      setTodo(currentTodo => [...currentTodo, newTodo]);
      resetForm();
      idForNewTodo += 1;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              value={titleName}
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={handleTitle}
            />
          </label>
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          {hasUserError && (
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
