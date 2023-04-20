import { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewId = (newTodo: Todo[]): number => {
  return Math.max(...newTodo.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [todoList, setTodos] = useState(todos);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectedUserError, setHasSelectedUserError] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    newTitle.replace(/[^a-zA-Z а-яА-Я ]/g, '');

    setNewTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectedUserError(false);
  };

  const resetForm = () => {
    setNewTitle('');
    setSelectedUserId(0);
    setHasSelectedUserError(false);
    setHasTitleError(false);
  };

  const addNewTodo = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: getNewId(todos),
      userId,
      title,
      completed: false,
      user: getUserById(selectedUserId),
    };

    setTodos([...todos, newTodo]);
    resetForm();
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTitle || !selectedUserId) {
      setHasTitleError(!newTitle);
      setHasSelectedUserError(!selectedUserId);

      return;
    }

    addNewTodo(newTitle, selectedUserId);
  };

  return (
    <div className="App">
      <div className="App__TodoForm">
        <h1 className="title is-2 has-text-white">Add todo form</h1>

        <form
          action="/api/users"
          onSubmit={handleFormSubmit}
        >
          <div className="field">
            <label htmlFor="titleInput">
              <input
                id="titleInput"
                type="text"
                className="input"
                data-cy="titleInput"
                placeholder="Enter a title"
                value={newTitle}
                onChange={handleChangeTitle}
              />

              {hasTitleError && (
                <span className="error">
                  Please enter a title
                </span>
              )}
            </label>
          </div>

          <div className="field">
            <label htmlFor="selectUser">
              <div className="select is-pink is-multiple is-fullwidth">
                <select
                  id="selectUser"
                  data-cy="userSelect"
                  value={selectedUserId}
                  onChange={handleChangeUser}
                >
                  <option value="0" disabled>
                    Choose a user
                  </option>

                  {usersFromServer.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <br />

            {hasSelectedUserError && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </div>

          <button
            type="submit"
            data-cy="submitButton"
            className="button is-info is-default is-responsive is-fullwidth"
          >
            Add
          </button>
        </form>

        <TodoList todos={todoList} />
      </div>
    </div>
  );
};
