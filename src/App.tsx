import { useState, FormEvent, ChangeEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/Users';
import { Todo } from './types/Todo';
import { Todowithuser } from './types/Todowithuser';
import { TodoList } from './components/TodoList';

function findUserById(users: User[], userId: number): User | null {
  return users.find(user => user.id === userId) || null;
}

function prepareTodos(todos: Todo[], users: User[]): Todowithuser[] {
  return todos.map(todo => ({
    ...todo,
    user: findUserById(users, todo.userId),
  }));
}

const dissallowedTitleCharsPattern = /[^\p{L}\p{N}\s]/gu;

function sanitizeTitle(title: string): string {
  return title.replace(dissallowedTitleCharsPattern, '');
}

const initialTodos = prepareTodos(todosFromServer, usersFromServer);

export const App = () => {
  const [todos, setTodos] = useState<Todowithuser[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(sanitizeTitle(event.target.value));

    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    if (hasUserError) {
      setHasUserError(false);
    }
  };

  const handleSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const trimmedTitle = title.trim();
    const isTitleValid = trimmedTitle !== '';
    const isUserValid = selectedUserId !== 0;

    setHasTitleError(!isTitleValid);
    setHasUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newTodoId = maxId + 1;

    const newTodo: Todowithuser = {
      id: newTodoId,
      title: trimmedTitle,
      userId: selectedUserId,
      completed: false,
      user: findUserById(usersFromServer, selectedUserId!),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setSelectedUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
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
