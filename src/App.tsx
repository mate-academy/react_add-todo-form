import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './components/UserInfo';
import { Todo } from './components/TodoInfo';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos = [...todosFromServer].map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

function getTodoId(currentTodos: Todo[]): number {
  const todosId = currentTodos.map(todo => todo.id);
  const largestId = Math.max(...todosId);

  return largestId + 1;
}

function titleCheck(title: string): string {
  const correctTitle = title
    .split('')
    .filter(char => char.toUpperCase() !== char.toLocaleLowerCase()
      || char === ' '
      || !Number.isNaN(Number(char)));

  return correctTitle.join('');
}

export const App = () => {
  const [currentTodos, setCurrentTodo] = useState(todos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewTodoTitle(newTodoTitle.trim());

    if (newTodoTitle && selectedUserId) {
      setCurrentTodo([
        ...currentTodos,
        {
          id: getTodoId(currentTodos),
          title: newTodoTitle,
          completed: false,
          userId: selectedUserId,
          user: getUser(selectedUserId),
        },
      ]);

      setNewTodoTitle('');
      setSelectedUserId(0);

      return;
    }

    if (!newTodoTitle) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setUserError(true);
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setNewTodoTitle(titleCheck(event.target.value));
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setSelectedUserId(+event.target.value);
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={handleChangeTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleChangeUserId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
