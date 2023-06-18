import { ChangeEvent, FormEventHandler, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

let highestId = Math.max(...todosFromServer.map(todo => todo.id));

export const App = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskUserId, setNewTaskUserId] = useState(0);
  const [hasEmptyTitle, setHasEmptyTitle] = useState(false);
  const [hasEmptyUser, setHasEmptyUser] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  })));

  const addNewTask: FormEventHandler = (event) => {
    event.preventDefault();

    setHasEmptyTitle(!newTaskTitle);
    setHasEmptyUser(!newTaskUserId);

    if (newTaskTitle && newTaskUserId) {
      highestId += 1;
      setTodos([...todos, {
        title: newTaskTitle,
        completed: false,
        userId: newTaskUserId,
        id: highestId,
        user: getUserById(newTaskUserId),
      }]);
      setNewTaskTitle('');
      setNewTaskUserId(0);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasEmptyTitle(false);
    const validatedTitle
    = (event.target.value).replace(/([^a-z0-9а-я\s])/gi, '');

    setNewTaskTitle(validatedTitle);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setHasEmptyUser(false);
    setNewTaskUserId(Number(event.target.value));
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
          <label id="titleInput" htmlFor="titleInput">Title: </label>
          <input
            name="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTaskTitle}
            onChange={handleTitleChange}
          />

          {hasEmptyTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label id="userSelect" htmlFor="userSelect">User: </label>
          <select
            name="userSelect"
            data-cy="userSelect"
            defaultValue={0}
            value={newTaskUserId}
            onChange={handleUserChange}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map((user: User) => {
              return (
                <option key={user.id} value={user.id}>{user.name}</option>
              );
            })}
          </select>

          {hasEmptyUser && <span className="error">Please choose a user</span>}
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
