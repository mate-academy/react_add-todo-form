import './App.scss';
import { FormEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const copyOfUsersFromServer: User[] = [...usersFromServer];

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const biggestTodoId = () => {
  const ids = [...todos].map(todo => {
    return todo.id;
  });

  return Math.max(...ids);
};

const createNewToDo = (inputTitle: string, selectedUser: string): Todo => {
  return {
    id: biggestTodoId() + 1,
    title: inputTitle,
    completed: false,
    userId: +selectedUser,
    user: getUser(+selectedUser),
  };
};

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [titleIsEmpty, setTitleIsEmpty] = useState(false);
  const [userIsEmpty, setUserIsEmpty] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputTitle.trim() === '') {
      setTitleIsEmpty(true);
    }

    if (!selectedUser) {
      setUserIsEmpty(true);
    }

    if (inputTitle.length <= 0 || !selectedUser) {
      return;
    }

    if (!titleIsEmpty && !userIsEmpty) {
      todos.push(createNewToDo(inputTitle, selectedUser));
    }

    setInputTitle('');
    setSelectedUser('');
    setTitleIsEmpty(false);
    setUserIsEmpty(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={inputTitle}
            onChange={event => {
              setInputTitle(event.target.value);
              setTitleIsEmpty(false);
            }}
          />

          {titleIsEmpty
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            onChange={(event) => {
              setSelectedUser(event.target.value);
              setUserIsEmpty(false);
            }}
            data-cy="userSelect"
            value={selectedUser}
          >
            <option value="" disabled>Choose a user</option>

            {copyOfUsersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userIsEmpty
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
