import './App.scss';
import {
  FC, useState, useEffect, ChangeEvent,
} from 'react';
import { User, Todo } from './tipes';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const users: User[] = usersFromServer.map(({ id, name, email }) => {
  return { id, name, email };
});

const data: Todo[] = todosFromServer.map((todo) => {
  const {
    id, title, completed, userId,
  } = todo;

  const user: User | undefined = users.find(item => item.id === userId);

  return {
    id, title, completed, user,
  };
});

export const App: FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [selectedUserError, setSelectedUserError] = useState<boolean>(false);

  useEffect(() => {
    setTodosList([...data]);
  }, []);

  const handleInput = (event : ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.trim()) {
      setTitleError(false);
    }

    setTitle(value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value.trim()) {
      setSelectedUserError(false);
    }

    setSelectedUser(value);
  };

  const handleSubmit = (event : ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setSelectedUserError(true);
    }

    if (!selectedUser || !title) {
      return;
    }

    const id = Math.max(...todosList.map(todo => todo.id)) + 1;
    const user: User | undefined = (
      users.find(item => item.name === selectedUser)
    );

    const newTodo: Todo = {
      id,
      title,
      completed: false,
      user,
    };

    setTodosList([
      ...todosList,
      newTodo,
    ]);

    setSelectedUser('');
    setTitle('');
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
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />

          {
            titleError
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <select
            placeholder="Choose a user"
            data-cy="selectedUser"
            value={selectedUser || 0}
            onChange={handleSelect}
          >
            <option
              value="0"
              disabled
              selected
            >
              Choose a user
            </option>
            {users.map(({ id, name }) => (
              <option key={id} value={name}>{name}</option>
            ))}
          </select>

          {
            selectedUserError
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
