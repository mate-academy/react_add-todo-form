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
  const [isAddClicked, setClickAdd] = useState(false);
  const [addTodo, setAddTodo] = useState(todos);

  const addNewTodo = () => {
    if (title && userEntered) {
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
      setClickAdd(false);
    }
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
                setClickAdd(false);
              }}
            />
            {(title === '' && isAddClicked === true) && (
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
                setClickAdd(false);
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
            {(userEntered === '' && isAddClicked === true) && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            setClickAdd(true);
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={addTodo} />

    </div>
  );
};
