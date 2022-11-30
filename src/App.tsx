import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

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

function getNewTodoId(todosArr: Todo[]) {
  const sortedTodos = todosArr.sort((todo1, todo2) => todo2.id - todo1.id);

  return sortedTodos[0].id + 1;
}

function findUserId(userName: string) {
  const neededUser = usersFromServer.find(user => user.name === userName);

  if (neededUser === undefined) {
    return 0;
  }

  return neededUser.id;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('Choose a user');
  const [titleInputError, setTitleInputError] = useState(false);
  const [userInputError, setUserInputError] = useState(false);
  const [allTodos, setAllTodos] = useState(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => {
          event.preventDefault();

          if (title === '') {
            setTitleInputError(true);
          }

          if (name === 'Choose a user') {
            setUserInputError(true);
          }

          const newUserId = findUserId(name);

          setAllTodos(currentTodos => [
            ...currentTodos,
            {
              id: getNewTodoId(currentTodos),
              title,
              completed: false,
              userId: newUserId,
              user: getUser(newUserId),
            },
          ]);
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            name="title"
            id="titleInput"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          {titleInputError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userInput">User: </label>

          <select
            data-cy="userSelect"
            id="userInput"
            value={name}
            onChange={event => setName(event.target.value)}
          >
            <option value={name} disabled>{name}</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          {userInputError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
