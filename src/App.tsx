import './App.scss';

import { ChangeEvent, SyntheticEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { User } from './types/user';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [userID, setUserID] = useState(0);
  const [newTodos, addNewTodo] = useState(todosWithUsers);
  const [isTitleError, setTitleError] = useState(false);
  const [isUserIDError, setUserIDError] = useState(false);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setNewTitle(value);
    setTitleError(false);
  };

  const handleSelectUser = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setUserID(+value);
    setUserIDError(false);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      setTitleError(true);
    }

    if (!userID) {
      setUserIDError(true);
    }

    if (newTitle.trim() && userID) {
      const todoId = Math.max(...newTodos.map(todo => todo.id)) + 1;
      const user = getUser(userID);

      const createTodo = {
        id: todoId,
        title: newTitle,
        completed: false,
        userId: userID,
        user,
      };

      addNewTodo(current => ([...current, createTodo]));
      setNewTitle('');
      setUserID(0);
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
          <label htmlFor="titleTodo">
            <input
              name="title"
              id="titleTodo"
              type="text"
              value={newTitle}
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={handleChangeTitle}
            />
          </label>
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userTodo">
            <select
              name="user"
              id="userTodo"
              value={userID}
              data-cy="userSelect"
              onChange={handleSelectUser}
            >
              <option>Choose a user</option>
              {usersFromServer.map(users => (
                <option
                  key={users.id}
                  value={users.id}
                >
                  {users.name}
                </option>
              ))}
            </select>
          </label>

          {isUserIDError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
