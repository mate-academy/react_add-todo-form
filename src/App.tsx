import { FormEvent, SetStateAction, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newSelectedUser, setNewSelectedUser] = useState('0');
  const [isTitle, setIsTitle] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const newId = () => {
    const ids = [...todos].map(todo => todo.id);

    return Math.max(...ids) + 1;
  };

  const handleChangeTitle = (title: SetStateAction<string>) => {
    setNewTodoTitle(title);
    setIsTitle(false);
  };

  const handleChangeUser = (selectedUser: SetStateAction<string>) => {
    setNewSelectedUser(selectedUser);
    setIsUser(false);
  };

  const addUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodoTitle) {
      setIsTitle(true);
    }

    if (+newSelectedUser < 1) {
      setIsUser(true);
    }

    if (!newTodoTitle || +newSelectedUser < 1) {
      return;
    }

    const todo: Todo = {
      id: newId(),
      title: newTodoTitle,
      completed: false,
      userId: +newSelectedUser,
    };

    setTodos([...todos, todo]);
    setNewTodoTitle('');
    setNewSelectedUser('0');
  };

  // eslint-disable-next-line no-console
  console.log(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => addUser(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            id="title"
            value={newTodoTitle}
            onChange={(event) => {
              handleChangeTitle(event.target.value
                .replace(/[^a-zA-Z0-9А-Яа-я ]/g, ''));
            }}
          />
          {isTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            data-cy="userSelect"
            name="select"
            id="select"
            value={newSelectedUser}
            onChange={(event) => handleChangeUser(event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {isUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
        users={usersFromServer}
      />
    </div>
  );
};
