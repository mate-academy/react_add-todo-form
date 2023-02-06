import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userValue: number | string): User | null {
  let foundUser = null;

  if (typeof userValue === 'number') {
    foundUser = usersFromServer.find(user => user.id === userValue);
  } else {
    foundUser = usersFromServer.find(user => user.name === userValue);
  }

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const newTodoID = (todosArr: Todo[]) => (
  Math.max(...todosArr.map(todo => todo.id)) + 1
);

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todosList, setTodosList] = useState(todos);
  const [todoId, setTodoId] = useState(newTodoID(todosList));
  const [submitButton, setSubmitButton] = useState(false);

  const getUserId = () => {
    const user = getUser(selectedUser);

    if (user !== null) {
      return user.id;
    }

    return null;
  };

  const newTodo = () => ({
    id: todoId,
    title,
    completed: false,
    userId: getUserId(),
    user: getUser(selectedUser),
  });
  const TodosAdder = () => {
    if (selectedUser && title) {
      setTodosList(
        [
          ...todosList,
          newTodo(),
        ],
      );
      setTodoId((prevId) => prevId + 1);
      setTitle('');
      setSelectedUser('');
      setSubmitButton(false);
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
          setSubmitButton(true);
          TodosAdder();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          {!title && submitButton
            ? <span className="error">Please enter a title</span>
            : null}
        </div>
        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(event.target.value);
            }}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option
                  value={user.name}
                  key={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>
          {!selectedUser && submitButton
            ? <span className="error">Please choose a user</span>
            : null}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <section className="TodoList">
          <TodoList todos={todosList} />
        </section>
      </section>
    </div>
  );
};
