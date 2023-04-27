import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = getUserById(Number(selectedUser));

    const isTitle = title.trim();

    if (!isTitle) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (!user || !isTitle) {
      return;
    }

    const createTodoId = (listOfTodos: Todo[]) => (
      Math.max(...listOfTodos.map(todo => todo.id)) + 1
    );

    const todoToAdd: Todo = {
      id: createTodoId(visibleTodos),
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
        onSubmit={handleSubmit}
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

          {isTitleError && <span className="error">Please enter a title</span>}
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

            {isUserError && <span className="error">Please choose a user</span>}
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
