import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const [todosList, setTodosList] = useState(todosFromServer);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (!typedTitle.trim()) {
      setHasTitleError(true);
    }

    if (selectedUserId === 0) {
      setHasNameError(true);
    }

    const maxId = Math.max(...todosList.map(todo => todo.id));

    if (typedTitle !== '' && selectedUserId) {
      const newTodo: Todo = {
        id: maxId + 1,
        title: typedTitle,
        userId: +selectedUserId,
        completed: false,
      };

      setTodosList((prevTodos) => [...prevTodos, newTodo]);
      setTypedTitle('');
      setSelectedUserId(0);
    }
  };

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTypedTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedUserId(+event.target.value);
    setHasNameError(false);
  };

  const todos = () => todosList.map(todo => ({
    ...todo,
    user: usersFromServer.find(u => u.id === todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="text" title="title">Title: </label>
          <input
            value={typedTitle}
            onChange={handleChangeTitle}
            type="text"
            data-cy="titleInput"
            title="title"
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="text" title="User">User: </label>
          <select
            value={selectedUserId}
            onChange={handleUserChange}
            data-cy="userSelect"
            title="User"
            defaultValue={0}
          >

            <option disabled value={0}>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>
          {hasNameError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleSubmit}>
          Add
        </button>
      </form>

      <TodoList todos={todos()} />
    </div>
  );
};
