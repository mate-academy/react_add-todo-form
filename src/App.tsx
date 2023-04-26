import { useState } from 'react';
import { Todo } from './Types/Todo';
import { User } from './Types/User';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const getUserById = (todo: Todo) => {
  return usersFromServer.find(user => user.id === todo.userId) || null;
};

const getTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo),
}));

const createTodo = (
  selectedUser: User,
  title: string,
  todos: Todo[],
): Todo => {
  const lastId = Math.max(...todos.map(todo => todo.id));

  return ({
    id: lastId + 1,
    title,
    completed: false,
    userId: selectedUser.id,
    user: selectedUser,
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(getTodos);
  const [isUserError, setIsUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [isUserSelected, setIsUserSelected] = useState('0');

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUserSelected(event.target.value);

    setIsUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setIsUserSelected('0');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = usersFromServer
      .find(user => user.name === isUserSelected) || null;

    if (!currentUser) {
      setIsUserError(true);
    }

    if (!title.trim()) {
      setTitleError(true);
    }

    if (currentUser && title.trim()) {
      const todo = createTodo(currentUser, title, getTodos);

      setTodos(current => ([
        ...current,
        todo,
      ]));

      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInputTitle}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={isUserSelected}
              onChange={handleSelectUser}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.name} key={user.id}>

                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
