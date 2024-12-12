import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedError, setSelectedError] = useState(false);

  const maxId = Math.max(...todosFromServer.map(todo => todo.id));
  const [todoId, setTodoId] = useState(maxId + 1);

  const [currentTodos, setCurrentTodos] = useState(todosFromServer);

  const validateForm = (): Todo[] | void => {
    if (title.length === 0) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (selectedUser === 0) {
      setSelectedError(true);
    } else {
      setSelectedError(false);
    }

    if (titleError || selectedError) {
      return;
    }

    const creator = usersFromServer.find(
      curUser => curUser.id === selectedUser,
    );

    if (creator) {
      const newTodo: Todo = {
        id: todoId,
        title: title,
        completed: false,
        userId: creator.id,
      };

      setTodoId(todoId + 1);
      setCurrentTodos([...currentTodos, newTodo]);
      setTitle('');
      setSelectedUser(0);
    } else {
      return;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          validateForm();
        }}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          <span className="error">
            {titleError === true && 'Please enter a title'}
          </span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={+selectedUser}
            onChange={e => {
              setSelectedUser(+e.target.value);
              setSelectedError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((curUser, index) => (
              <option key={index} value={index + 1}>
                {curUser.name}
              </option>
            ))}
          </select>

          <span className="error">
            {selectedError === true && 'Please choose a user'}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList users={usersFromServer} todos={currentTodos} />
    </div>
  );
};
