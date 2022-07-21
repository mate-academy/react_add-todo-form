import './App.scss';

import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodo] = useState<Todo[]>(preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitle, setIsTitle] = useState(true);
  const [isUserName, setIsUserName] = useState(true);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    // const defaultUser = { id: 1, name: 'default', email: 'default' };

    if (!todoTitle) {
      setIsTitle(false);
    }

    if (!userName) {
      setIsUserName(false);
    }

    if (todoTitle && userName) {
      const newUser = usersFromServer
        .find(user => user.name === userName) || null;

      const newTodo: Todo = {
        id: todos.length + 1,
        title: todoTitle.trim(),
        completed: false,
        user: newUser,
      };

      setTodo(currentTodos => [...currentTodos, newTodo]);
      setTodoTitle('');
      setUserName('');
    }
  }

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setIsTitle(true);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserName(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(onSubmit)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={handleTitle}
          />
          {!isTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            name="users"
            data-cy="userSelect"
            value={userName}
            onChange={handleUserName}
          >
            <option
              value="Choose a user"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!isUserName && (
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
