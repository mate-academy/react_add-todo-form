import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, TodoElement } from './components/Type/type';

function getUserById(users: User[], userId: number): User | undefined {
  return users.find(user => user.id === userId);
}

/* export const initialTodos = todosFromServer.map(todo => ({
 ...todo,
  user: getUserById(usersFromServer, todo.userId),
 }));
*/
export const initialTodos = todosFromServer
  .map(todo => {
    const user = getUserById(usersFromServer, todo.userId);

    if (!user) {
      return null;
    }

    return { ...todo, user };
  })
  .filter((todo): todo is TodoElement => todo !== null);

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  //const [userState, setUserState] = useState('');
  const [currentTodos, setCurrentTodos] = useState<TodoElement[]>(initialTodos);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError('');
    }
  };

  const resetForm = () => {
    setTitle('');
    setTitleError('');
    setSelectedUserId('');
    setUserError('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    if (userError) {
      setUserError('');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasError = false;

    if (!title.trim()) {
      hasError = true;
      setTitleError('Please enter a title');
    }

    if (!selectedUserId) {
      hasError = true;
      setUserError('Please choose a user');
    }

    if (hasError) {
      return;
    }

    const numericUser = Number(selectedUserId);
    const numericValue = getUserById(usersFromServer, numericUser);

    const idNew =
      currentTodos.length > 0
        ? Math.max(...currentTodos.map(todo => todo.id)) + 1
        : 1;

    if (!numericValue) {
      setUserError('Selected user does not exist');

      return;
    }

    const newTodo: TodoElement = {
      id: idNew,
      title,
      completed: false,
      userId: numericUser,
      user: numericValue,
    };

    setCurrentTodos([...currentTodos, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput"> Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect"> User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={currentTodos} />
    </div>
  );
};
