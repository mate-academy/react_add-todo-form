import { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

export function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const newTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [users] = useState(usersFromServer);
  const [todos, setTodos] = useState(newTodos);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleTitleChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    if (isTitleError) {
      setIsTitleError(true);
    }

    setIsTitleError(false);
    setNewTitle(changeEvent.target.value);
  };

  const handleUserChange = (changeEvent: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+changeEvent.target.value);
    setIsUserError(false);
  };

  const handleAddTodo = (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const isEmpty = (todoProp: string) => todoProp.trim() === '';

    if (isEmpty(newTitle)) {
      setIsTitleError(true);
    }

    if (!selectedUser) {
      setIsUserError(true);
    }

    if (isEmpty(newTitle) || !selectedUser) {
      return;
    }

    const getMaxId = (someTodos: Todo[]) => {
      const maxId = Math.max(...someTodos.map(todo => todo.id));

      if (someTodos.length) {
        return maxId + 1;
      }

      return 1;
    };

    const newTodo: Todo = {
      id: getMaxId(todos),
      title: newTitle,
      userId: selectedUser,
      completed: false,
      user: getUserById(selectedUser),
    };

    setTodos(() => [...todos, newTodo]);

    const clearForm = () => {
      setNewTitle('');
      setSelectedUser(0);
    };

    clearForm();
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
          <label htmlFor="title">
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={handleTitleChange}
            />
          </label>

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            <span>User: </span>
            <select
              data-cy="userSelect"
              onChange={handleUserChange}
              value={selectedUser}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
