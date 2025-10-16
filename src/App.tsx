import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

export type TodoUserAggregate = Todo & {
  user?: User;
};

function getUserById(users: User[], userId: number): User | undefined {
  return users.find(user => user.id === userId);
}

export const initialTodos: TodoUserAggregate[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [todos, setTodos] = useState<TodoUserAggregate[]>(initialTodos);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setSelectedUserId('');
    setTitleError(false);
    setUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9\s]/g,
      '',
    );

    setTitle(inputValue);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError(true);
      hasError = true;
    }

    if (selectedUserId === '') {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const numericUserId = Number(selectedUserId);
    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const newTodo: TodoUserAggregate = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: numericUserId,
      user: getUserById(usersFromServer, numericUserId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add Todo</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
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
