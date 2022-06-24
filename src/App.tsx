import React, { useState } from 'react';
import cn from 'classnames';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './apptypes.defs';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const getUserByID = (userId: number) => {
  return users.find(user => userId === user.id) || null;
};

const App: React.FC = () => {
  const [todosList, setTodos] = useState([...preparedTodos]);
  const [todoTitle, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);

  const [hasTitleInputError, setHasTitleInputError] = useState(false);
  const [hasUserInputError, setHasUserInputError] = useState(false);

  const addtodo = (title: string, userId: number) => {
    const newTodo: Todo = {
      userId,
      id: Math.max(...todosList.map((todo) => todo.id)) + 1,
      title,
      completed: false,
      user: getUserByID(userId),
    };

    setTodos([...todosList, newTodo]);
  };

  const clearForm = () => {
    setSelectedUser(0);
    setTitle('');
  };

  const validateInputs = () => {
    if (!todoTitle) {
      setHasTitleInputError(true);
    }

    if (!selectedUser) {
      setHasUserInputError(true);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    validateInputs();

    if (todoTitle && selectedUser) {
      addtodo(todoTitle, selectedUser);
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="title">
          <div className="notification">
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Add a task"
              value={todoTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setHasTitleInputError(false);
                setTitle(event.target.value);
              }}
              className={cn(
                'input',
                { error: hasTitleInputError },
              )}
            />

            {hasTitleInputError && (
              <span
                style={{
                  color: 'red',
                  textTransform: 'uppercase',
                }}
              >
                Please enter the title
              </span>
            )}
          </div>
        </label>

        <label htmlFor="userName">
          <div className="notification">
            <select
              value={selectedUser}
              onChange={(event) => {
                setHasUserInputError(false);
                setSelectedUser(Number(event.target.value));
              }}
              className={cn({ error: hasUserInputError })}
            >
              <option value="0" hidden>
                Choose User
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

            {hasUserInputError && (
              <span
                style={{
                  color: 'red',
                  textTransform: 'uppercase',
                }}
              >
                Please Choose a User
              </span>
            )}
          </div>
        </label>

        <div className="notification">
          <button
            type="submit"
            className="button"
          >
            Add todo
          </button>
        </div>

      </form>
      <TodoList preparedTodos={todosList} />
    </div>
  );
};

export default App;
