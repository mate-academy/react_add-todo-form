/* eslint-disable no-console */
import { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

// console.log(usersFromServer);

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [localTodos, setTodos] = useState<Todo[]>(todos);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [enteredTitle, setTodoTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addTodo = (newTodo: Todo) => {
    setTodos([...localTodos, newTodo]);
  };

  const getNextId = (todoList: Todo[]) => {
    return Math.max(...todoList.map(todo => todo.id)) + 1;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
    setTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(e.target.value));
    setUserError(false);
  };

  const handleAddTodo = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (selectedUserId === null || enteredTitle === '') {
      setUserError(selectedUserId === null);
      setTitleError(enteredTitle === '');

      console.error(titleError, userError, 'ERROR');

      return;
    }

    addTodo({
      id: getNextId(localTodos),
      title: enteredTitle,
      completed: false,
      userId: selectedUserId,
      user: getUser(selectedUserId),
    });

    setSelectedUserId(null);
    setTodoTitle('');
    setUserError(false);
    setTitleError(false);
  };

  // console.log(todos, '= todosFromServer');
  // console.log(localTodos, '= localTodos');
  // console.log(selectedUserId, '= selectedUserid');
  // console.log(enteredTitle, '= enteredTitle');

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            aria-label="Title"
            value={enteredTitle}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />

          {titleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            aria-label="User"
            value={selectedUserId || '0'}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={localTodos} />
    </div>
  );
};
