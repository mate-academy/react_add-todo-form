import './App.scss';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const userWithProperty = (property: keyof User, value: string | number) => {
  return usersFromServer.find(user => user[property] === value) || null;
};

const getUserWithTodo = (todo: Todo) => {
  return userWithProperty('id', todo.userId);
};

const getTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserWithTodo(todo),
}));

const getTodo = (
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
  const [isUserError, setisUserError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [userSelectedId, setuserSelectedId] = useState('0');

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const filteredInput = input.replace(/[^A-Za-zА-Яа-я0-9\s]/g, '');

    setTitle(/^\s*$/.test(filteredInput)
      ? ''
      : filteredInput);

    setIsTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setuserSelectedId(event.target.value);

    setisUserError(false);
  };

  const handleReset = () => {
    setTitle('');
    setuserSelectedId('0');
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = userWithProperty('name', userSelectedId);

    if (!currentUser) {
      setisUserError(true);
    }

    if (!title) {
      setIsTitleError(true);
    }

    if (!currentUser || !title) {
      return;
    }

    const todo = getTodo(currentUser, title, getTodos);

    setTodos(current => ([
      ...current,
      todo,
    ]));

    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
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

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={userSelectedId}
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
