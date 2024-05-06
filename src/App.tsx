import { useState } from 'react';

import './App.scss';

import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null =>
  usersFromServer.find(user => user.id === userId) || null;

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  const [existTodos, setExistTodos] = useState<Todo[]>(initialTodos);

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setHasTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const getNextStepId = (todos: Todo[]): number => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  };

  const addTodo = ({ id, ...data }: Todo): void => {
    const newTodo = {
      id: getNextStepId(existTodos),
      ...data,
    };

    setExistTodos(currentTodos => [...currentTodos, newTodo]);

    // reset form
    setTitle('');
    setUserId(0);
  };

  const handleSubmitForm = (event: React.FormEvent): void => {
    event.preventDefault();
    //validate form
    setHasTitleError(!title);
    setHasSelectError(!userId);

    if (!title || !userId) {
      return;
    }

    //pass new todo to add fn
    addTodo({
      id: 0,
      completed: false,
      title,
      userId,
      user: getUserById(userId),
    });
  };

  return (
    <div className="App section">
      <h1 className="title">Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmitForm}>
        <div className="field">
          <label htmlFor="titleInput" className="label">
            Title:&nbsp;
          </label>
          <input
            type="text"
            data-cy="titleInput"
            className="input"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInputTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect" className="label">
            User:&nbsp;
          </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            className="select"
            required
            value={userId}
            onChange={handleSelectUser}
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

          {hasSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" className="button">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={existTodos} />
      </section>
    </div>
  );
};
