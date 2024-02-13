import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function findMaxId(allTodos: Todo[]): number {
  return Math.max(...allTodos.map(oneTodo => oneTodo.id));
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) as User,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [hasUserError, setHasUserError] = useState<boolean>(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedUserId(+event.target.value);
    setHasUserError(false);
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!selectedUserId);

    if (!title.trim() || !selectedUserId) {
      return;
    }

    const maxId = findMaxId(todos);

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user:
        usersFromServer.find(user => user.id === selectedUserId) as User,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>

          <input
            id="title"
            name="title"
            type="text"
            value={title}
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={changeTitle}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:&nbsp;</label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={changeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
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
