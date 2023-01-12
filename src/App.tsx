import { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number | null): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getUserId(selectedUser: string): number | null {
  const foundUser = usersFromServer.find(user => user.name === selectedUser);

  return foundUser ? foundUser.id : null;
}

function getNewTodoId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

function getVisibleTodos(
  todos: Todo[],
  selectedUser: string,
  title: string,
): Todo[] {
  const todoId = getNewTodoId(todos);
  const userId = getUserId(selectedUser);
  const todo = {
    id: todoId,
    userId,
    title: title.trim(),
    completed: false,
    user: getUser(userId),
  };

  return [...todos, todo];
}

function inputControl(event: React.ChangeEvent<HTMLInputElement>): boolean {
  const lastSymbol = event.target.value[event.target.value.length - 1];

  return /\p{sc=Latn}|\p{sc=Cyrillic}| |\d/u.test(lastSymbol);
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('Choose a user');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  let error = false;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (title.length === 0) {
            setErrorTitle(true);
            error = true;
          }

          if (selectedUser === 'Choose a user') {
            setErrorUser(true);
            error = true;
          }

          if (!error) {
            setTodos(getVisibleTodos(todos, selectedUser, title));
            setTitle('');
            setSelectedUser('Choose a user');
          }
        }}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={title}
              onChange={(event) => {
                if (inputControl(event)) {
                  setTitle(event.target.value);
                  setErrorTitle(false);
                }
              }}
            />
          </label>
          {errorTitle && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              name="user"
              data-cy="userSelect"
              value={selectedUser}
              onChange={(event) => {
                setSelectedUser(event.target.value);
                setErrorUser(false);
              }}
            >
              <option disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          {errorUser && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
