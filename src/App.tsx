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
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const onEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTitleEmpty(false);
    setTitle(event.target.value);
  };

  const onSwitchUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUserEmpty(false);
    setUserId(+event.target.value);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleEmpty = title === '';
    const userEmpty = userId === 0;

    setIsTitleEmpty(titleEmpty);
    setIsUserEmpty(userEmpty);

    if (!titleEmpty && !userEmpty) {
      const todoId = maxTodoId + 1;

      allTodos.push({
        user: usersFromServer.find(u => u.id === userId),
        id: todoId,
        completed: false,
        title,
        userId,
      });
      setTitle('');
      setUserId(0);
      setMaxTodoId(todoId);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          submitForm(event);
        }}
      >
        <div className="field">
          <label htmlFor={titleInputId}>Title: </label>

          <input
            id={titleInputId}
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={event => onEditTitle(event)}
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
            value={userId}
            onChange={event => onSwitchUser(event)}
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
