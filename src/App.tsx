import { FC, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App:FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setSelectedUserId] = useState(0);
  const [visibleTodos, setTodo] = useState(todos);
  const [isEmptyTitle, isEmptyTitleCheck] = useState(true);
  const [isUserSelected, isUserSelectedCheck] = useState(true);

  const newId = Math.max(...visibleTodos.map(todo => todo.id));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title) {
            isEmptyTitleCheck(false);
          }

          if (!userId) {
            isUserSelectedCheck(false);
          }

          if (title && userId) {
            const selectedUser = usersFromServer
              .find(person => person.id === userId) || null;

            const newTodo: Todo = {
              id: newId + 1,
              title,
              completed: false,
              userId: selectedUser?.id || null,
              user: selectedUser,
            };

            setTodo((state) => ([...state, newTodo]));
            setTitle('');
            setSelectedUserId(0);
          }
        }}
      >
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={(event) => {
                setTitle(event.target.value);
                isEmptyTitleCheck(true);
              }}
            />
          </label>
          {!isEmptyTitle && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setSelectedUserId(+event.target.value);
                isUserSelectedCheck(true);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(person => (
                <option value={person.id} key={person.id}>{person.name}</option>
              ))}
            </select>
          </label>
          {!isUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
