import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './Types/User';
import { ToDo } from './Types/ToDo';

import './App.scss';

import { TodoList } from './components/TodoList';

export function findUser(userId: number): User | null {
  return usersFromServer.find(user => (
    user.id === userId
  )) || null;
}

export const newToDos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [todos, setToDo] = useState(newToDos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleValid(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setIsUserValid(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = findUser(+selectedUser);
    const titleValidation = title.trim();

    if (!titleValidation) {
      setIsTitleValid(true);
    }

    if (!user) {
      setIsUserValid(true);
    }

    if (!user || !titleValidation) {
      return;
    }

    const getNextToDoId = (toDoList: ToDo[]) => (
      Math.max(...toDoList.map(todo => todo.id)) + 1
    );

    const newToDo: ToDo = {
      id: getNextToDoId(todos),
      title,
      userId: user.id,
      completed: false,
      user,
    };

    setToDo([...todos, newToDo]);
    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {isTitleValid && (
            <span className="Valid">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              placeholder="Choose a user"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserValid && (
            <span className="Valid">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
