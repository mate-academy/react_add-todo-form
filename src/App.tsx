import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const retrieveUser = (): Todo[] => {
    return todosFromServer.map(todo => {
      const user = usersFromServer
        .find(serverUser => serverUser.id === todo.userId) || null;

      return { ...todo, user };
    });
  };

  const retrievedUser = retrieveUser();
  const [todos, setTodos] = useState(retrievedUser);

  const handleTitleChange = (event: FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsTitleEmpty(false);
  };

  const handleUserChange = (event: FormEvent<HTMLSelectElement>) => {
    setUserName(event.currentTarget.value);
    setIsUserSelected(false);
  };

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedUser = usersFromServer.find(user => user.name === userName);
    const todosIds = todos.map(todo => todo.id);
    const maxId = Math.max(...todosIds);
    const trimedTitle = title.trim();

    if (title.length < 1 || trimedTitle.length < 1) {
      setIsTitleEmpty(true);
    }

    if (!selectedUser) {
      setIsUserSelected(true);
    }

    if (
      !isTitleEmpty
      && !isUserSelected
      && trimedTitle
      && selectedUser
    ) {
      setTodos([
        ...todos,
        {
          id: maxId + 1,
          userId: selectedUser?.id,
          title: trimedTitle,
          completed: false,
          user: selectedUser || null,
        }]);
      setTitle('');
      setUserName('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {(isTitleEmpty) && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={handleUserChange}
            value={userName}
          >
            <option defaultChecked>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {(isUserSelected) && (
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
      <TodoList todos={todos} />
    </div>
  );
};
