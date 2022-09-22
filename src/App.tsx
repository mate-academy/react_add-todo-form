import './App.scss';
import { ChangeEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { UsersList } from './components/UsersList/UsersList';
import { TodoList } from './components/TodoList';
import { User } from './types/user';
import { Todo } from './types/todo';

function getUser(userId: number): User | undefined {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('0');
  const [title, setTitle] = useState('');
  const [isClickedUser, setIsClickedUser] = useState(false);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const isSomeFieldEmpty = !title || selectedUser === '0';

  const pattern = new RegExp('[а-яА-ЯёЁA-Za-z0-9 ]');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;
    const currentInputLetter = targetValue.slice(-1);

    if (pattern.test(currentInputLetter)) {
      setTitle(targetValue);
    } else {
      setTitle(targetValue.slice(0, -1));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    const sortCopyTodo = [...todos].sort((todo1, todo2) => todo1.id - todo2.id);
    const maxId = sortCopyTodo[sortCopyTodo.length - 1].id + 1;
    const targetUser = usersFromServer.find(user => user.name === selectedUser);

    event.preventDefault();

    if (isSomeFieldEmpty) {
      if (selectedUser === '0') {
        setIsClickedUser(true);
      }

      if (title === '') {
        setIsEmptyTitle(true);
      }

      return;
    }

    if (targetUser !== undefined) {
      todos.push({
        id: maxId,
        title,
        completed: false,
        userId: targetUser.id,
        user: targetUser,
      });

      setSelectedUser('0');
      setTitle('');
      setIsEmptyTitle(false);
      setIsClickedUser(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label>
          {'Title: '}
          <div className="field">
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />

            {!title && isEmptyTitle
              && <span className="error">Please enter a title</span>}
          </div>
        </label>

        <label>
          {'User: '}
          <div className="field">
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleSelectChange}
            >
              <option value="0" disabled>Choose a user</option>

              <UsersList usersList={usersFromServer} />
            </select>

            {selectedUser === '0' && isClickedUser
              && <span className="error">Please choose a user</span>}
          </div>
        </label>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todosList={todos} />
    </div>
  );
};
