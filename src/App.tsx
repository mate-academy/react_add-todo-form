import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoAggregate } from './types/TodoAggregate';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

const todosAggregate: TodoAggregate[] = todosFromServer.map(todo => {
  const foundUser =
    usersFromServer.find(user => user.id === todo.userId) ?? null;

  if (!foundUser) {
    throw new Error(`Missing user in todo: ${todo.id}`);
  }

  return {
    ...todo,
    user: foundUser,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<TodoAggregate[]>(todosAggregate);
  const [newTitle, setNewTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [newTodoUserId, setNewTodoUserId] = useState(0);
  const [todoUserIdError, setTodoUserIdError] = useState('');

  const handleAddTodo = (todo: TodoAggregate) => {
    setTodos(current => [...current, todo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitleError('');
    setTodoUserIdError('');

    let hasErrors = false;

    const preparedTitle = newTitle.trim();

    if (!preparedTitle) {
      setTitleError('Please enter a title');
      hasErrors = true;
    }

    if (!newTodoUserId) {
      setTodoUserIdError('Please choose a user');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    const foundUser = usersFromServer.find(user => user.id === newTodoUserId);

    if (!foundUser) {
      return;
    }

    const newTodo: TodoAggregate = {
      id: maxId + 1,
      title: preparedTitle,
      userId: newTodoUserId,
      completed: false,
      user: foundUser,
    };

    handleAddTodo(newTodo);

    setNewTitle('');
    setNewTodoUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        {/* action="/api/todos" method="POST" */}
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            id="title-input"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={newTitle}
            onChange={event => {
              setNewTitle(event.target.value);
              setTitleError('');
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User: </label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={newTodoUserId}
            onChange={event => {
              setNewTodoUserId(Number(event.target.value));
              setTodoUserIdError('');
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {todoUserIdError && (
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
