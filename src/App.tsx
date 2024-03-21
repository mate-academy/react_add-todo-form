import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './Types/Todo';
import { User } from './Types/User';

const preparedTodos = todosFromServer.map(elem => {
  return {
    ...elem,
    user: usersFromServer.find(user => user.id === elem.userId) || null,
  };
});

function getLastIndex(todosList): number {
  return Math.max(...todosList.map(currentTodo => currentTodo.id)) + 1;
}

function getUserById(selectedUserId): User {
  return usersFromServer.find(user => user.id === selectedUserId) as User;
}

export const App = () => {
  const [todosList, setTodosList] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isTitleFilled, setIsTitleFilled] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);

  const addTodo = (newTodo: Todo) => {
    setTodosList(currentTodo => [...currentTodo, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleFilled(true);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setIsUserSelected(true);
  };

  function reset() {
    setSelectedUserId(0);
    setTitle('');

    setIsTitleFilled(true);
    setIsUserSelected(true);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleFilled(!!title);
    setIsUserSelected(!!selectedUserId);

    if (!selectedUserId || !title) {
      return;
    }

    addTodo({
      id: getLastIndex(todosList),
      title,
      completed: false,
      user: getUserById(selectedUserId),
      userId: selectedUserId,
    });

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
            value={title}
            placeholder="Enter a title"
            onChange={event => handleTitleChange(event)}
          />
          {!isTitleFilled && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => handleUserSelect(event)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!isUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
