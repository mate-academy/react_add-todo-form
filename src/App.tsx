import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todoListWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todoListWithUsers);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const user = getUserById(selectedUserId);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!todoTitle);
    setIsUserError(!selectedUserId);

    if (!todoTitle && !selectedUserId) {
      return;
    }

    const generateTodoId = () => {
      const todoIds = todos.map(todo => todo.id);

      return Math.max(...todoIds) + 1;
    };

    setTodoTitle(todoTitle.trim());

    const newTodo: Todo = {
      id: generateTodoId(),
      title: todoTitle,
      userId: selectedUserId,
      completed: false,
      user,
    };

    if (todoTitle && selectedUserId) {
      setTodos(listOfTodos => [...listOfTodos, newTodo]);
      setTodoTitle('');
      setSelectedUserId(0);
    }
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const selectedUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <label>
          <div className="field">
            <input
              type="text"
              data-cy="titleInput"
              value={todoTitle}
              placeholder="Please enter a title"
              onChange={titleHandler}
            />
            {!todoTitle.trim() && isTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </div>
        </label>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={selectedUserHandler}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(person => (
              <option value={person.id} key={person.id}>
                {person.name}
              </option>
            ))}
          </select>

          {!selectedUserId && isUserError && (
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
