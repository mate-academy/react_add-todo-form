import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User, TodosWithUser } from './types/Types';

export const App = () => {
  const users: User[] = usersFromServer;
  const todos: Todo[] = todosFromServer;

  const preparedTodosWithUsers = () => (
    todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || null,
    }))
  );

  const [selectedUser, setSelectedUser] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [
    todosWithUsers,
    setTodosWithUsers,
  ] = useState<TodosWithUser[]>(preparedTodosWithUsers());
  const [isValid, setIsValid] = useState(true);

  const resetValidated = () => {
    setIsValid(true);
  };

  const resetSelectedUser = () => {
    setSelectedUser('');
  };

  const resetCrrentTitle = () => {
    setCurrentTitle('');
  };

  const validatedTitleAndUser = currentTitle && selectedUser;

  const handleAddButton = (event:React.FormEvent<HTMLFormElement>) => {
    if (validatedTitleAndUser) {
      event.preventDefault();
      setTodosWithUsers(
        [...todosWithUsers,
          {
            id: (todos.sort((a, b) => b.id - a.id)[0].id + 1),
            title: currentTitle,
            userId: Number(selectedUser),
            completed: false,
            user: users.find(user => user.id === Number(selectedUser)) || null,
          },
        ],
      );
      resetValidated();
      resetSelectedUser();
      resetCrrentTitle();
    }

    if (!validatedTitleAndUser) {
      event.preventDefault();
      setIsValid(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddButton}>
        <div className="field">
          <label htmlFor="titleInput">
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={currentTitle}
              onChange={event => setCurrentTitle(event.target.value.trim())}
            />
          </label>

          {!isValid && !currentTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={event => setSelectedUser(event.target.value)}
            >
              <option value="" disabled>
                Choose a user
              </option>

              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!isValid && !selectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      {todosWithUsers.map(todo => (
        <TodoList key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
