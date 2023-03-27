import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo, User } from './react-app-env';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getLargestTodoId(todos: Todo[]): number {
  const todoWithLargestId = [...todos].sort(
    (todo1, todo2) => (
      todo2.id - todo1.id
    ),
  )[0];

  return todoWithLargestId.id;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [sourceTodos, setSourceTodos] = useState(todos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoUser, setNewTodoUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: getLargestTodoId(sourceTodos) + 1,
      userId: newTodoUser,
      title: newTodoTitle,
      completed: false,
      user: getUserById(newTodoUser),
    };

    setHasTitleError(!newTodoTitle);
    setHasUserError(!newTodoUser);

    if (newTodoTitle && newTodoUser) {
      setSourceTodos(
        prevTodos => [...prevTodos, newTodo],
      );
      setNewTodoUser(0);
      setNewTodoTitle('');
    }
  };

  const handleUserSelect = (
    { target: { value } }: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setNewTodoUser(+value);
    setHasUserError(false);
  };

  const handleTitleChange = (
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTodoTitle(
      value.replace(/[^a-zA-Z0-9\sруен]/g, ''),
    );

    setHasTitleError(false);
  };

  return (
    <div className="App">
      <h1 className="title has-text-centered">Add todo form</h1>

      <div className="columns">
        <div className="column">
          <TodoList todos={sourceTodos} />
        </div>

        <div className="section column">
          <form
            onSubmit={handleSubmitForm}
            className="form"
          >
            <div className="field">
              <div className="control">
                <input
                  data-cy="titleInput"
                  name="title"
                  type="text"
                  value={newTodoTitle}
                  placeholder="Enter a title"
                  onChange={handleTitleChange}
                  className="input"
                />
                {hasTitleError && (
                  <span className="error help is-danger">
                    Please enter a title
                  </span>
                )}
              </div>
            </div>

            <div className="field">
              <div className="control">
                <div className="select">
                  <select
                    data-cy="userSelect"
                    name="user"
                    value={newTodoUser}
                    onChange={handleUserSelect}
                    className="width-100"
                  >
                    <option value="0" disabled>
                      Choose a user
                    </option>

                    {usersFromServer.map(user => (
                      <option
                        value={user.id}
                        key={user.id}
                      >
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                {hasUserError && (
                  <span className="error help is-danger">
                    Please choose a user
                  </span>
                )}
              </div>
            </div>

            <div className="field has-text-centered">
              <div className="control">
                <button
                  type="submit"
                  data-cy="submitButton"
                  className="form__button button is-centered"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
