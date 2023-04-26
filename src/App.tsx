import { FC, ChangeEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserId(userId: number): User | null {
  return (usersFromServer.find(user => (user.id === userId)) || null);
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

export const App: FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [todoTitle, setTodoTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = event.target;

    switch (id) {
      case 'titleInputForm':
        setTitleError(false);
        setTodoTitle(value);
        break;

      case 'userInputForm':
        setUserError(false);
        setSelectedUser(getUserId(Number(value)));
        break;

      default:
        throw new Error('error');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (!todoTitle || !selectedUser) {
      return;
    }

    const newTodoId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newTodoId,
      title: todoTitle,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setVisibleTodos([...visibleTodos, newTodo]);
    setTodoTitle('');
    setSelectedUser(null);
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
          <label htmlFor="titleInputForm">Title: </label>

          <input
            type="text"
            id="titleInputForm"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleChange}
          />

          {titleError && (
            <span
              className="error"
            >
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userInputForm">User: </label>

          <select
            data-cy="userSelect"
            id="userInputForm"
            placeholder="Choose a user"
            value={selectedUser?.id || 0}
            onChange={handleChange}
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

          {userError && (
            <span
              className="error"
            >
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
