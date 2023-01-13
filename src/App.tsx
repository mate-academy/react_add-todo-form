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

function inputControl(inputValue: string): boolean {
  const lastSymbol = inputValue[inputValue.length - 1];

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

  const handleInputTitle = (inputValue: string) => {
    if (inputControl(inputValue)) {
      setTitle(inputValue);
      setErrorTitle(false);
    }
  };

  const getVisibleTodos = (currentTodos: Todo[]): Todo[] => {
    const todoId = getNewTodoId(currentTodos);
    const userId = getUserId(selectedUser);
    const todo = {
      id: todoId,
      userId,
      title: title.trim(),
      completed: false,
      user: getUser(userId),
    };

    return [...currentTodos, todo];
  };

  const handleSubmit = () => {
    if (!title) {
      setErrorTitle(true);
      error = true;
    }

    if (selectedUser === 'Choose a user') {
      setErrorUser(true);
      error = true;
    }

    if (!error) {
      setTodos(currentTodos => getVisibleTodos(currentTodos));
      setTitle('');
      setSelectedUser('Choose a user');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
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
                handleInputTitle(event.target.value);
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
