import React, { useState } from 'react';
import classnames from 'classnames';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { User, PreparedToDo } from './react-app-env';
import { TodoList } from './components/TodoList';

const getUserByID = (userId: number): User | null => {
  return users.find(user => user.id === userId) || null;
};

const PreparedTodos: PreparedToDo[] = todos.map(todo => ({
  ...todo,
  user: getUserByID(todo.userId),
}));

const App: React.FC = () => {
  const [toDos, setToDos] = useState<PreparedToDo[]>([...PreparedTodos]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const handleEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      userId: selectedUserId,
      id: toDos.length + 1,
      title: newTodoTitle,
      completed: false,
      user: getUserByID(selectedUserId),
    };

    setTitleError(!newTodoTitle);
    setUserError(!selectedUserId);

    if (newTodoTitle && selectedUserId) {
      setToDos(currentTodo => [...currentTodo, newTodo]);
      setNewTodoTitle('');
      setSelectedUserId(0);
    }
  };

  return (
    <div className="App has-text-centered column is-half is-offset-one-quarter">
      <h1 className="title is-1">Add todo</h1>
      <form
        onSubmit={handleEvent}
        className="mb-5"

      >

        <div className="mr-4 mb-5">
          <input
            type="text"
            className={classnames('input', 'is-success', 'is-rounded', {
              'is-danger': !newTodoTitle,
            })}
            value={newTodoTitle}
            placeholder="Аdd a task"
            onChange={(event => {
              const regexp = /^[a-zа-яёы0-9\s]+$/i;
              const { value } = event.target;

              if (!value || regexp.test(value)) {
                setNewTodoTitle(value);
              }

              setTitleError(false);
            })}
          />

          {titleError && (
            <p className="has-text-danger">
              Please enter the title
            </p>
          )}
        </div>

        <div className={classnames(
          'select', 'is-success', 'is-rounded', 'mr-4', 'mb-4', {
            'is-danger': !selectedUserId,
          },
        )}
        >
          <select
            value={selectedUserId}
            onChange={(event => {
              setSelectedUserId(+event.target.value);
              setUserError(false);
            })}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <p className="has-text-danger">Please choose a user</p>
          )}

        </div>

        <button
          type="submit"
          className="button is-warning is-rounded"
        >
          Add
        </button>
      </form>

      <TodoList todos={toDos} />
    </div>
  );
};

export default App;
