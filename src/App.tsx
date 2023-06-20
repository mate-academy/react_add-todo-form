import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodoId, getUserById } from './helper';

export const App = () => {
  const todos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [currentTodos, setCurrentTodos] = useState(todos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoUserId, setNewTodoUserId] = useState('');
  const newTodoUser = usersFromServer
    .find(user => user.id === +newTodoUserId);

  const [error, setError] = useState(false);

  const AddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoTitle === '' || +newTodoUserId === 0) {
      setError(true);

      return;
    }

    setCurrentTodos((prevTodos) => {
      const newTodo = {
        id: getTodoId(prevTodos),
        title: newTodoTitle,
        completed: false,
        userId: +newTodoUserId,
        user: newTodoUser,
      };

      return [...prevTodos, newTodo];
    });
    setNewTodoTitle('');
    setNewTodoUserId('');
    setError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={AddTodo}
      >
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTodoTitle}
              onChange={(event) => {
                setNewTodoTitle(event.target.value);
              }}
            />
          </label>
          {error && newTodoTitle === '' && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:&nbsp;
            <select
              name="user"
              id="user"
              data-cy="userSelect"
              value={newTodoUserId}
              onChange={(event) => {
                setNewTodoUserId(event.target.value);
              }}
            >
              <option value="0" selected>Choose a user</option>
              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option value={id}>{name}</option>
                );
              })}
            </select>
          </label>

          {error && +newTodoUserId === 0 && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={currentTodos} />
    </div>
  );
};
