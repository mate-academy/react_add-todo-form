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

export const App = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('Choose a user');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [allTodos, setAllTodos] = useState(todos);

  function getNewTodoId(todosArr: Todo[]) {
    const sortedTodos = [...todosArr]
      .sort((todo1, todo2) => todo2.id - todo1.id);

    return sortedTodos[0].id + 1;
  }

  function findUserId(userName: string) {
    const neededUser = usersFromServer.find(user => user.name === userName);

    if (neededUser === undefined) {
      return 0;
    }

    return neededUser.id;
  }

  function handleFormSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title.trim() === '') {
      setIsTitleError(true);
    }

    if (name === 'Choose a user') {
      setIsNameError(true);
    }

    const findedUserId = findUserId(name);

    const newTodo = {
      id: getNewTodoId(allTodos),
      title,
      completed: false,
      userId: findedUserId,
      user: getUser(findedUserId),
    };

    if (title.trim() !== '' && name !== 'Choose a user') {
      setAllTodos(currentTodos => [
        ...currentTodos,
        newTodo,
      ]);

      setTitle('');
      setName('Choose a user');
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            name="title"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setIsTitleError(false);
            }}
          />

          {isTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userInput">User: </label>

          <select
            data-cy="userSelect"
            id="userInput"
            value={name}
            onChange={event => {
              setName(event.target.value);
              setIsNameError(false);
            }}
          >
            <option value={name} disabled>{name}</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          {isNameError
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
