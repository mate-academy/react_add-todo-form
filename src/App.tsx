import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './type/User';
import { Todo } from './type/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userEntered, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [addTodo, setAddTodo] = useState(todos);

  const addNewTodo = () => {
    if (!userEntered) {
      setUserError(true);
    }

    if (!title) {
      setTitleError(true);
    }

    if (!userEntered || !title) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      userId: +userEntered,
      title,
      completed: false,
      user: getUser(+userEntered),
    };

    setAddTodo((state) => (
      [
        ...state,
        newTodo,
      ]));

    setTitle('');
    setUser('');
    setUserError(false);
    setTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          addNewTodo();
          setUserError(!userEntered);
          setTitleError(!title);
        }}
      >
        <div className="field">
          <label>
            Title:
            <> </>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
            {titleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <> </>
            <select
              data-cy="userSelect"
              value={userEntered}
              onChange={(event) => {
                setUser(event.target.value);
                setUserError(false);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(selectedUser => (
                <option
                  key={selectedUser.id}
                  value={selectedUser.id}
                >
                  {selectedUser.name}
                </option>
              ))}

            </select>
            {userError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={addTodo} />

    </div>
  );
};
