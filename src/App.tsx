import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { has } from 'cypress/types/lodash';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(0, ...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setTitle(value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, ''));
    setHasTitleError(false);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUserId(+event.target.value);
    setHasUserError(false);
  }

  const resetForm = () => {
    setSelectedUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setHasTitleError(!trimmedTitle);
    setHasUserError(!selectedUserId);

    if (!trimmedTitle || !selectedUserId) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title: trimmedTitle,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
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
            onChange={handleUserChange}
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
