import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError(false);
  };

  const todoId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

  const handleSubmitting = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    const user = getUser(Number(selectedUser));

    if (selectedUser === '0' || !user) {
      setUserError(true);

      return;
    }

    const todoToAdd: Todo = {
      id: todoId,
      title,
      userId: user.id,
      completed: false,
      user,
    };

    if (title && selectedUser !== '0') {
      setVisibleTodos([...visibleTodos, todoToAdd]);
      setTitle('');
      setSelectedUser('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitting}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              id="title"
              placeholder="Enter a title"
              value={title}
              onChange={handleInputChange}
            />
          </label>

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              id="user"
              value={selectedUser}
              onChange={handleSelectChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            {userError && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
