import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/Users';
import { Todo } from './types/Todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(person => person.id === userId) || null;
}

const todo: Todo[] = todosFromServer.map(item => {
  const user = getUserById(item.userId);

  return { ...item, user };
});

function getNewTodoId(items: Todo[]) {
  const maxId = Math.max(...items.map(item => item.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todo);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const onAdd = (newTodo: Todo) => {
    const currentTodo = {
      ...newTodo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, currentTodo]);
  };

  const handleReset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);
    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    });

    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="">
            Name:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="">
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
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
          </label>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
