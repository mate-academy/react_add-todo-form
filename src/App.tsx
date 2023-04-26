import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(({ id }) => id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

type Element = HTMLInputElement | HTMLSelectElement;

export const App = () => {
  const [titleOfTodo, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [preparedTodos, setTodos] = useState(todos);
  const [isUserError, setIsUserError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const handleChange = (event: React.ChangeEvent<Element>) => {
    const { id, value } = event.target;

    switch (id) {
      case 'titleInputForm':
        setIsTitleError(false);
        setTitle(value);
        break;

      case 'userSelectForm':
        setIsUserError(false);
        setSelectedUser(getUserById(+(value)));
        break;

      default:
        throw new Error('Errrror');
    }
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isTitleError) {
      setIsTitleError(true);
    }

    if (!selectedUser) {
      setIsUserError(true);
    }

    if (!titleOfTodo || !selectedUser) {
      return;
    }

    const newTodoId = Math.max(...preparedTodos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newTodoId,
      userId: selectedUser ? selectedUser.id : -1,
      title: titleOfTodo,
      completed: false,
      user: selectedUser,
    };

    setTodos([...preparedTodos, newTodo]);
    setSelectedUser(null);
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAdd}
      >
        <div className="field">
          <label htmlFor="#">
            Title:
          </label>

          <input
            id="titleInputForm"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleOfTodo}
            onChange={handleChange}
          />

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="#">
            User:
          </label>

          <select
            id="userSelectForm"
            data-cy="userSelect"
            value={selectedUser?.id || 0}
            onChange={handleChange}
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

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={preparedTodos} />
    </div>
  );
};
