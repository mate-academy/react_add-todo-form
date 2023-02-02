import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [selectedUserName, setUserName] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [isSubmitted, setSubmit] = useState(false);

  const getNewId = () => (
    Math.max(...todos.map(todo => todo.id)) + 1
  );

  const addTodo = () => {
    const selectedUser = usersFromServer.find(
      user => user.name === selectedUserName,
    );

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: getNewId(),
      title,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setSubmit(true);

    if (selectedUserName && title) {
      addTodo();
      setTitle('');
      setUserName('');
      setSubmit(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          {'Title: '}
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {!title && isSubmitted && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectedUserName}
            onChange={(event) => setUserName(event.target.value)}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              const { name, id } = user;

              return (
                <option value={`${name}`} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {!selectedUserName && isSubmitted && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
