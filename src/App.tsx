import React, { useState, ChangeEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  const user = usersFromServer.find((person) => person.id === userId);

  return user || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [todos, setToDos] = useState<Todo[]>(todosWithUser);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);

  const handleCustomTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setIsSelectError(false);
  };

  const resetForm = () => {
    setCustomTitle('');
    setSelectedUser('');
    setIsTitleError(false);
    setIsSelectError(false);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = Math.max(...todos.map((elem) => elem.id));
    const userId = +selectedUser;

    const todo: Todo = {
      id: newId + 1,
      title: customTitle,
      completed: false,
      userId: 0,
      user: getUserById(userId),
    };

    if (!customTitle) {
      setIsTitleError(true);
    }

    if (!selectedUser) {
      setIsSelectError(true);
    }

    if (selectedUser.length && customTitle.length) {
      setToDos([...todos, todo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addTodo}>
        <div className="field">
          <input
            placeholder="enter the title"
            type="text"
            data-cy="titleInput"
            value={customTitle}
            onChange={handleCustomTitle}
          />
          {isTitleError
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {isSelectError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
