import './App.scss';
import { FormEventHandler, useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosWithUsers);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [isTitleProvided, setIsTitleProvided] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);

    if (!title && !selectedUser) {
      setIsTitleProvided(false);
      setIsUserSelected(false);

      return;
    }

    if (!title) {
      setIsTitleProvided(false);

      return;
    }

    if (!selectedUser) {
      setIsUserSelected(false);

      return;
    }

    setTodos(prevTodos => {
      const newId = Math.max(...prevTodos.map(todo => todo.id)) + 1;
      const foundUser = usersFromServer
        .filter(user => user.name === selectedUser)[0];

      const newTodo = {
        id: newId,
        userId: foundUser.id,
        title,
        completed: false,
        user: foundUser,
      };

      return [...todos, newTodo];
    });

    setSelectedUser('');
    setTitle('');
  };

  const handleTitleChange:
  React.ChangeEventHandler<HTMLInputElement>
  = (event) => {
    setTitle(event.target.value);

    setIsTitleProvided(true);
  };

  const handleSelectedUserChange:
  React.ChangeEventHandler<HTMLSelectElement>
  = (event) => {
    setSelectedUser(event.target.value);

    setIsUserSelected(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {!isTitleProvided && isFormSubmitted
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>
          <select
            id="selectUser"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectedUserChange}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option key={id} value={name}>{name}</option>);
            })}
          </select>

          {!isUserSelected && isFormSubmitted
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
