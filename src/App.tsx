import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const readyTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(readyTodos);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUserIdError, setHasSelectedUserIdError] = useState(false);

  const newTodoId = Math.max(...todos.map(todo => todo.id));

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    setHasSelectedUserIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleFormSubmit = (event:FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectedUserIdError(!selectedUserId);

    const newTodo: Todo = {
      id: newTodoId + 1,
      userId: selectedUserId,
      title,
      completed: false,
      user: getUser(selectedUserId),
    };

    if (title && selectedUserId) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
      resetForm();
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
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
            data-cy="titleInput"
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <select
            value={selectedUserId}
            onChange={handleSelect}
            data-cy="userSelect"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {hasSelectedUserIdError && (
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
