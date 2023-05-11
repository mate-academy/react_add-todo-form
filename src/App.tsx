import { FormEventHandler, useState, ChangeEvent } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './components/TodoInfo';
import { User } from './components/UserInfo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

function getNewId(todos: Todo[]) {
  return (
    todos.reduce((acc, curr) => {
      return Math.max(acc, curr.id);
    }, 0) + 1
  );
}

function getTodos() {
  return todosFromServer.map((todo) => ({
    ...todo,
    user: getUser(todo.userId),
  }));
}

const validateInput = (string: string) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\d\s]*$/;

  if (!regex.test(string)) {
    return false;
  }

  return true;
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState(getTodos());

  const lookForError = () => {
    if (!title && !selectedUser) {
      setTitleError(true);
      setUserError(true);
    } else if (!selectedUser) {
      setUserError(true);
    } else if (!title) {
      setTitleError(true);
    }
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!title || !selectedUser) {
      lookForError();

      return;
    }

    const newTodo = {
      id: getNewId(todos),
      title,
      completed: false,
      userId: selectedUser,
      user: getUser(selectedUser),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setSelectedUser(0);
    setTitle('');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'title') {
      if (validateInput(value)) {
        setTitle(value);
        setTitleError(false);
      }
    } else {
      setSelectedUser(+value);
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          {' '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            id="title"
            name="title"
            onChange={handleChange}
          />
          {' '}
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          {' '}
          <select
            data-cy="userSelect"
            id="user"
            name="user"
            value={selectedUser}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {' '}
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
