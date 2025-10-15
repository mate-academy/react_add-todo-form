import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './api/todos';
import { User } from './api/users';
import { useState } from 'react';

export type TodoWithUser = Todo & { user: User | undefined };

const todos: TodoWithUser[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(({ id }) => id === todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState<TodoWithUser[]>(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const addNewTodo = (newTodo: TodoWithUser) =>
    setNewTodos(currentTodos => [...currentTodos, newTodo]);

  const user = usersFromServer.find(userItem => userItem.id === userId);

  const newId =
    newTodos.length > 0 ? Math.max(...newTodos.map(todo => todo.id)) + 1 : 1;

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectedUserID = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(+event.target.value);
    if (+event.target.value !== 0) {
      setHasUserIdError(false);
    }
  };

  const handleAddButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    addNewTodo({
      id: newId,
      title: title.trim(),
      completed: false,
      userId,
      user,
    });

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddButton}>
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;
            <input
              type="text"
              id="title"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitle}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:&nbsp;
            <select
              data-cy="userSelect"
              id="userSelect"
              value={userId}
              onChange={handleSelectedUserID}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(item => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
