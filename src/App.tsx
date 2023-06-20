import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodoId, getUserById, handleChanges } from './helper';

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
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const AddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle) {
      setTitleError(true);
    }

    if (!newTodoUserId) {
      setSelectError(true);
    }

    if (!newTodoUserId || !newTodoTitle) {
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
              onChange={handleChanges(setNewTodoTitle, setTitleError)}
            />
          </label>
          {titleError && (
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
              onChange={handleChanges(setNewTodoUserId, setSelectError)}
            >
              <option value="0" selected>Choose a user</option>
              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option value={id} key={id}>{name}</option>
                );
              })}
              {/* {usersFromServer.map({ id, name } => (
                <option value={id} key={id}>{name}</option>
              ))} */}
            </select>
          </label>

          {selectError && (
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
