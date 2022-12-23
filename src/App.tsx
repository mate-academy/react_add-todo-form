import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function findUserByName(userName: string): User | null {
  return usersFromServer.find(user => (user.name === userName)) || null;
}

const todos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [todosToRender, setTodosToRender] = useState(todos);
  const [isErrorOnUserSelect, setErrorOnUserSelect] = useState(false);
  const [isErrorOnTitleInput, setErrorOnTitleInput] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setErrorOnTitleInput(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(event.currentTarget.value);
    setErrorOnUserSelect(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorOnTitleInput(!title.trim());
    setErrorOnUserSelect(!userSelect);

    if (title.trim() === '' || !userSelect) {
      return;
    }

    const maxTodoId = Math.max(...todosToRender.map(todo => todo.id));
    const userToAdd = findUserByName(userSelect);

    setTodosToRender(current => [
      ...current,
      {
        id: maxTodoId + 1,
        title,
        completed: false,
        userId: userToAdd ? userToAdd.id : null,
        user: userToAdd,
      },
    ]);

    setTitle('');
    setUserSelect('');
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
          <label
            htmlFor="title"
            className="label"
          >
            Write down your task:
          </label>

          <input
            data-cy="titleInput"
            type="text"
            id="title"
            name="title"
            value={title}
            className="form__input"
            placeholder="Enter title of task"
            onChange={handleTitleChange}
          />

          {isErrorOnTitleInput
            && (
              <span className="error">Please enter a title</span>
            )}
        </div>

        <div className="field">
          <label
            htmlFor="userSelect"
            className="label"
          >
            Choose user:
          </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={userSelect}
            className="form__input"
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          {isErrorOnUserSelect
            && (
              <span className="error">Please choose a user</span>
            )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosToRender} />
    </div>
  );
};
