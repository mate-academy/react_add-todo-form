import React, { useState } from 'react';
import users from '../../api/users';
import { ToDos } from '../../react-app-env';
import TodoInfo from '../TodoInfo/TodoInfo';
import UserInfo from '../UserInfo/UserInfo';
import './TodoList.css';

interface Props {
  initialTodos: ToDos[];
}

const TodoList: React.FC<Props> = ({ initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUser, setSelectedUSer] = useState(0);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showSelectErrorMessage, setShowSelectErrorMessage] = useState(false);

  function addTodo() {
    const newTodo = {
      title: newTitle,
      userId: selectedUser,
      completed: false,
      id: Math.max(...todos.map((todo) => todo.id)) + 1,
      user: users.find(user => user.id === selectedUser) || null,
    };

    setTodos([...todos, newTodo]);

    setNewTitle('');
    setSelectedUSer(0);
  }

  const regex = /[^a-z0-9 ]/ig;

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowTitleError(false);

    const title = event
      .target
      .value
      .replace(regex, '');

    setNewTitle(title);
  };

  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();

        if (newTitle && selectedUser) {
          addTodo();
        }
      }}
      >
        <label htmlFor="titleInput">
          Title:

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={newTitle}
            onChange={inputHandler}
          />

          {showTitleError
          && <span className="error_message">Please enter title</span>}
        </label>

        <br />

        <label htmlFor="selectUserInput">
          Select user:

          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setShowSelectErrorMessage(false);
              setSelectedUSer(Number(event.target.value));
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {showSelectErrorMessage
          && <span className="error_message">Please choose a user</span>}
        </label>

        <br />

        <button
          type="submit"
          onClick={() => {
            if (!newTitle) {
              setShowTitleError(true);
            }

            if (!selectedUser) {
              setShowSelectErrorMessage(true);
            }
          }}
        >
          Add
        </button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <UserInfo user={todo.user} />
            <TodoInfo todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
