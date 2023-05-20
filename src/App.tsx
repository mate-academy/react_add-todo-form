import './App.scss';
import { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './type/user';
import { Todo } from './type/todo';

function getUser(userId: number): User | undefined {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || undefined;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [selectedTitle, setTitle] = useState('');
  const [selectedUser, setUser] = useState('');
  const [addNewTodo, setTodo] = useState(todos);
  const [validationTitle, setValidationTitle] = useState(true);
  const [validationUser, setValidationUser] = useState(true);

  const clearFormField = () => {
    setTitle('');
    setUser('');
  };

  useEffect(() => {
    return () => (
      clearFormField()
    );
  }, [addNewTodo]);

  useEffect(() => {
    setValidationTitle(true);
  }, [selectedTitle]);

  useEffect(() => {
    setValidationUser(true);
  }, [selectedUser]);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/users"
        method="POST"
        onSubmit={(eventOnSubmit) => {
          eventOnSubmit.preventDefault();
        }}
      >
        <div className="field">
          <label htmlFor="titleId">
            Title:
          </label>
          <input
            id="titleId"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={selectedTitle}
            onChange={eventOnChange => setTitle(eventOnChange.target.value)}
          />
          {!validationTitle
           && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="userSelectId">
            User:
          </label>
          <select
            id="userSelectId"
            data-cy="userSelect"
            value={selectedUser}
            onChange={eventOnChage => setUser(eventOnChage.target.value)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          {!validationUser
           && (<span className="error">Please choose a user</span>)}
        </div>
        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            const findUser = usersFromServer.find(
              user => user.name === selectedUser,
            );
            const largeId = [...todos].sort(
              (a, b) => a.id - b.id,
            )[todos.length - 1].id;

            const newTodo = {
              id: largeId + 1,
              title: selectedTitle,
              completed: false,
              userId: findUser?.id && undefined,
              user: findUser,
            };

            const newAdd = [...addNewTodo];

            newAdd.push(newTodo);

            if ((selectedTitle && selectedUser)) {
              setTodo(newAdd);
            }

            if (!selectedTitle) {
              setValidationTitle(false);
            }

            if (!selectedUser) {
              setValidationUser(false);
            }
          }}
        >
          Add
        </button>
      </form>
      <TodoList todos={addNewTodo} />
    </div>
  );
};
