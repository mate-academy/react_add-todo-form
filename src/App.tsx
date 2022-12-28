import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import 'bootstrap/dist/css/bootstrap.min.css';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function findUserByName(userName: string): User | null {
  return usersFromServer.find(user => (user.name === userName)) || null;
}

const todos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todosToRender, setTodosToRender] = useState(todos);
  const [isErrorOnUserSelect, setErrorOnUserSelect] = useState(false);
  const [isErrorOnTitleInput, setErrorOnTitleInput] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setErrorOnTitleInput(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.currentTarget.value);
    setErrorOnUserSelect(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorOnTitleInput(!title.trim());
    setErrorOnUserSelect(!selectedUser);

    if (title.trim() === '' || !selectedUser) {
      return;
    }

    const userToAdd = findUserByName(selectedUser);

    setTodosToRender(current => {
      const maxTodoId = Math.max(...current.map(todo => todo.id));

      return [
        ...current,
        {
          id: maxTodoId + 1,
          title,
          completed: false,
          userId: userToAdd ? userToAdd.id : null,
          user: userToAdd,
        },
      ];
    });

    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1 className="fs-1 m-3 fw-bold">Add todo form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label
            htmlFor="title"
            className="label"
          >
            Write down your task:
          </label>

          <input
            data-cy="titleInput"
            type="text"
            id="title"
            name="title"
            value={title}
            className="form-control mb-3"
            placeholder="Enter title of task"
            onChange={handleTitleChange}
          />

          {isErrorOnTitleInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="userSelect"
            className="label"
          >
            Choose user:
          </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUser}
            className="form-select mb-3"
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          {isErrorOnUserSelect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button btn btn-primary"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosToRender} />
    </div>
  );
};
