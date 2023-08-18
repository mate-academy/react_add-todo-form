import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const titleInputId = 'title';
const userInputId = 'user';
const userSelectDefaultValue = '0';

const allTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserEmpty, setIsUserEmpty] = useState(false);
  const [maxTodoId, setMaxTodoId] = useState(
    Math.max(...allTodos.map(todo => todo.id)),
  );

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();

          const titleInput
            = document.getElementById(titleInputId) as HTMLInputElement;
          const userInput
            = document.getElementById(userInputId) as HTMLInputElement;
          const title = titleInput?.value;
          const userId = +userInput?.value;
          const emptyTitle = title === '';
          const emptyUser = userId === 0;

          setIsTitleEmpty(emptyTitle);
          setIsUserEmpty(emptyUser);

          if (!emptyTitle && !emptyUser) {
            const todoId = maxTodoId + 1;

            allTodos.push({
              user: usersFromServer.find(u => u.id === userId),
              id: todoId,
              completed: false,
              title,
              userId,
            });
            titleInput.value = '';
            userInput.value = userSelectDefaultValue;
            setMaxTodoId(todoId);
          }
        }}
      >
        <div className="field">
          <label htmlFor={titleInputId}>Title: </label>

          <input
            id={titleInputId}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={() => setIsTitleEmpty(false)}
          />

          {isTitleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor={userInputId}>User: </label>

          <select
            id={userInputId}
            data-cy="userSelect"
            defaultValue="0"
            onChange={() => setIsUserEmpty(false)}
          >
            <option disabled value={userSelectDefaultValue}>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {isUserEmpty && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
