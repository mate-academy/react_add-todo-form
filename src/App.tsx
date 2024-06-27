import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todo } from './types/Todo';

const todos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  };
});

export const App = () => {
  const [todo, setToDo] = useState<Todo[]>(todos);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  function getNewTodoId(todosList: Todo[]) {
    const maxId = Math.max(...todosList.map(t => t.id));

    return maxId + 1;
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setHasTitleError(false);
    setTitle(value);
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!selectedUserId);
    if (!title.trim() || !selectedUserId) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todo),
      title,
      completed: false,
      userId: selectedUserId,
      user: usersFromServer.find(user => user.id === selectedUserId) || null,
    };

    setToDo(prevTodo => {
      return [...prevTodo, newTodo];
    });

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handelSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleChange}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.email} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todo} />
    </div>
  );
};
