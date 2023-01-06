import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [currentTodos, setTodo] = useState(todos);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleAddButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setErrorTitle(true);
    }

    if (!name) {
      setErrorUser(true);
    }

    if (!title || !name) {
      return;
    }

    const selectedUser: User | undefined = usersFromServer.find(
      user => user.name === name,
    );

    const largestID = currentTodos.sort((a: Todo, b: Todo) => (
      b.id - a.id))[0].id;

    if (selectedUser) {
      const newTodo = [
        ...currentTodos,
        {
          id: largestID + 1,
          title,
          completed: false,
          userId: largestID + 1,
          user: {
            id: largestID + 1,
            name,
            username: selectedUser.username,
            email: selectedUser.email,
          },
        },
      ];

      setTodo(newTodo);
      setTitle('');
      setName('');
    }
  };

  const verifyCharacters = (character: string) => {
    const lettersEng = /^[A-Za-z0-9 ]*$/.test(character);
    const lettersRu = /^[ЁёА-я0-9 ]*$/.test(character);

    return lettersEng || lettersRu;
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (verifyCharacters(value)) {
      setTitle(value);
      setErrorTitle(false);
    }
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
    setErrorUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddButton}
      >
        <div className="field">
          <label className="titleLabel">
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
            {errorTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={name}
              onChange={handleChangeUser}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            {errorUser && (
              <span className="error"> Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
