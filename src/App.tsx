import './App.scss';
import React from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getNewId } from './utils/getNewId';
import { getUserById } from './utils/getUserId';

const initialTodoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = React.useState(initialTodoList);

  const [title, setTitle] = React.useState('');
  const [hasTitleError, setHasTitleError] = React.useState(false);

  const [userId, setUserId] = React.useState(0);
  const [hasUserIdError, setHasUserIdError] = React.useState(false);

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSetId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  // Обробка форми
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    // Додати нове завдання
    const newTodo: Todo = {
      id: getNewId(newTodos),
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    setNewTodos(current => [...current, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Please enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleSetTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select data-cy="userSelect" value={userId} onChange={handleSetId}>
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
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
      <TodoList todos={newTodos} />
    </div>
  );
};
