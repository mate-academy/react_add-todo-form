import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [isTitleSelected, setIsTitleSelected] = useState(true);
  const [todos, setTodos] = useState(todosWithUsers);

  const handleTitleInput: React.ChangeEventHandler<HTMLInputElement>
    = (event) => {
      setTitle(event.target.value);
      setIsTitleSelected(true);
    };

  const handleUserChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setIsUserSelected(true);
    setUser(event.target.value);
  };

  const clearFormFields = () => {
    setTitle('');
    setUser('');
  };

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!title || !user) {
      setIsTitleSelected(false);
      setIsUserSelected(false);

      return;
    }

    setTodos(prevTodo => {
      const newId = Math.max(...prevTodo.map(obj => obj.id)) + 1;
      const newUser = usersFromServer
        .find(userName => userName.name === user);

      if (!newUser) {
        return [...todos];
      }

      const addTodo = {
        id: newId,
        title,
        completed: false,
        userId: newUser.id,
        user: newUser,
      };

      return [...todos, addTodo];
    });

    clearFormFields();
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
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleInput}
          />
          {!isTitleSelected && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={handleUserChange}
            id={user}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(userItem => {
              const { id, name } = userItem;

              return (
                <option key={id} id={name}>
                  {name}
                </option>
              );
            })}
          </select>

          {!isUserSelected && (
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
