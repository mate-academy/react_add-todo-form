import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

function findUser(todo: Todo, users: User[]) {
  return users.filter((user: User) => user.id === todo.userId)[0];
}

function prepareTodos(todos: Todo[], users: User[]) {
  return todos.map((todo) => {
    return {
      ...todo,
      user: findUser(todo, users),
    };
  });
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [currentUser, setCurrentUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const [todosList, setTodosList] = useState<Todo[]>(todosFromServer);

  const listOfTodos = prepareTodos(todosList, usersFromServer);

  function handleReset() {
    setHasTitleError(false);
    setHasUserError(false);
    setTitle('');
    setCurrentUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          // if (!title) {
          //   setHasTitleError(true);
          //   return
          // }

          // if (!currentUser) {
          //   setHasUserError(true);
          // }

          setHasTitleError(!title);
          setHasUserError(!currentUser);

          if (!title || !currentUser) {
            return;
          }

          setTodosList([
            ...todosList,
            {
              id: todosList.length + 1,
              title,
              completed: false,
              userId: currentUser,
            },
          ]);

          handleReset();
        }}
      >
        <div className="field">
          <label htmlFor="description">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="description"
            placeholder="Please enter a title"
            value={title}
            onChange={(event) => {
              setHasTitleError(false);
              setTitle(event.target.value);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="users">User: </label>
          <select
            value={currentUser}
            data-cy="userSelect"
            id="users"
            onChange={(event) => {
              setCurrentUser(+event.target.value);
              setHasUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {[...usersFromServer].map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList listOfTodos={listOfTodos} />
    </div>
  );
};
