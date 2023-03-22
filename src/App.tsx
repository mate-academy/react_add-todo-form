import './App.scss';

import { FormEvent, useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getId = (todosList: Todo[]): number => {
  return Math.max(...todosList.map(todo => todo.id)) + 1;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setUserId] = useState(0);
  const [todosList, setTodos] = useState(todos);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const clear = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    // check if title only consist of eng and ua letters, numbers and spaces
    const isValid = trimmedTitle.replace(
      /[ a-z0-9\u0400-\u04FF]/gi, '',
    ).length === 0;

    if (!trimmedTitle || !isValid) {
      setShowTitleError(true);
    }

    if (!selectedUserId) {
      setShowUserError(true);
    }

    if ((trimmedTitle && isValid) && selectedUserId) {
      const newTodo: Todo = {
        title,
        id: getId(todosList),
        completed: false,
        userId: selectedUserId,
        user: getUser(selectedUserId),
      };

      setTodos(prevTodos => [
        ...prevTodos,
        newTodo,
      ]);

      clear();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setShowTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(Number(value));
    setShowUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {showTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="userSelection"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ name, id }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {showUserError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
