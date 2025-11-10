import { useState } from 'react';
import classNames from 'classnames';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import './App.scss';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    })),
  );

  const [titleInput, setTitleInput] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІїЇєЄ0-9 ]/g,
      '',
    );

    setTitleInput(sanitized);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    if (userError) {
      setUserError(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleEmpty = titleInput.trim() === '';
    const isUserNotSelected = selectedUserId === '';

    if (isTitleEmpty || isUserNotSelected) {
      setTitleError(isTitleEmpty);
      setUserError(isUserNotSelected);

      return;
    }

    const nextId = Math.max(0, ...todos.map(todo => todo.id)) + 1;
    const selectedUser = usersFromServer.find(
      user => user.id === Number(selectedUserId),
    );

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: nextId,
      title: titleInput.trim(),
      completed: false,
      userId: Number(selectedUserId),
      user: selectedUser,
    };

    setTodos(current => [...current, newTodo]);
    setTitleInput('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleFormSubmit}>
        <div className={classNames('field', { 'has-error': titleError })}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleInput}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className={classNames('field', { 'has-error': userError })}>
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
