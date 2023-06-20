import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { getCurrentTodos, getNewId } from './helpers';

import { InitialTodo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const users = usersFromServer;
  const [todos, setTodos] = useState<InitialTodo[]>(todosFromServer);

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserSelectError, setIsUserSelectError] = useState(false);

  const todosWithUsers = getCurrentTodos(todos, users);

  const clearForm = () => {
    setSelectedUserId(0);
    setNewTodoTitle('');
    setIsTitleError(false);
    setIsUserSelectError(false);
  };

  const addTodo = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUserId === 0 || newTodoTitle === '') {
      setIsTitleError(newTodoTitle === '');
      setIsUserSelectError(selectedUserId === 0);

      return;
    }

    setTodos((prevTodos) => {
      const newTodo = {
        id: getNewId(prevTodos),
        title: newTodoTitle.trim(),
        userId: selectedUserId,
        completed: false,
      };

      return [...prevTodos, newTodo];
    });

    clearForm();
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <label htmlFor="titleTodo">
            {'Title: '}
          </label>

          <input
            id="titleTodo"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={((event) => {
              setNewTodoTitle(event.target.value);
              setIsTitleError(false);
            })}
          />

          {isTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelector">
            {'User: '}
          </label>
          <select
            id="userSelector"
            data-cy="userSelect"
            onChange={((event) => {
              setIsUserSelectError(false);
              setSelectedUserId(+event.target.value);
            })}
            value={selectedUserId}
          >
            <option value="0">
              Choose a user
            </option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {`${user.name}`}
              </option>
            ))}
          </select>

          {isUserSelectError && (
            <span className="error">
              Please choose a user
            </span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
