import AnimatedCursor from "react-animated-cursor";
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserByName(userName: string): User | null {
  return usersFromServer.find(user => (user.name === userName)) || null;
}

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const prepTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState(prepTodos);

  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleOnTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setTitleError(false);
  };

  const handleOnUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.currentTarget.value);
    setUserError(false);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserError(!selectedUser);

    if (title.trim() === '' || !selectedUser) {
      return;
    }

    const userToAdd = getUserByName(selectedUser);

    setTodos(current => {
      const maxTodoId = Math.max(...current.map(todo => todo.id));

      return [
        ...current,
        {
          id: maxTodoId + 1,
          title,
          completed: false,
          userId: userToAdd ? userToAdd.id : null,
          user: userToAdd,
        },
      ];
    });

    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <AnimatedCursor
        innerSize={10}
        outerSize={60}
        color="255, 255, 255"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={1.2}
      />
      <div className="noise">
        <></>
      </div>

      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            <></>
          </label>

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title of task"
            value={title}
            onChange={handleOnTitleChange}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label className="field__input" htmlFor="title">
            <></>
          </label>

          <select
            className="field__select"
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUser}
            onChange={handleOnUserChange}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          className="field__add"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
      <p className="result">My best project!</p>
    </div>
  );
};
