import { ChangeEvent, FormEventHandler, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskUserId, setNewTaskUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const todos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const addNewTask: FormEventHandler = (event) => {
    event.preventDefault();
    const emptyTaskTitle = (newTaskTitle === '');
    const invalidUserId = (newTaskUserId === 0);

    setTitleError(emptyTaskTitle);
    setUserError(invalidUserId);

    if (!emptyTaskTitle && !invalidUserId) {
      todosFromServer.push({
        title: newTaskTitle,
        completed: false,
        userId: newTaskUserId,
        id: Math.random(),
      });
      setNewTaskTitle('');
      setNewTaskUserId(0);
    }
  };

  const validateTitleField = (event: ChangeEvent<HTMLInputElement>) => {
    const validatedTitle
    = (event.target.value).replace(/([^a-z0-9а-я\s])/gi, '');

    setNewTaskTitle(validatedTitle);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTask}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            name="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTaskTitle}
            onChange={(event) => {
              setTitleError(false);
              validateTitleField(event);
            }}
          />

          {titleError
            ? <span className="error">Please enter a title</span>
            : undefined}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            name="userSelect"
            data-cy="userSelect"
            defaultValue={0}
            value={newTaskUserId}
            onChange={(event) => {
              setUserError(false);
              setNewTaskUserId(Number(event.target.value));
            }}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map((user: User) => {
              return (
                <option value={user.id}>{user.name}</option>
              );
            })}
          </select>

          {userError
            ? <span className="error">Please choose a user</span>
            : undefined}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
