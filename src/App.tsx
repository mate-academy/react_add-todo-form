import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUserById(id: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [isTitleValid, setIsTitleValid] = useState<boolean>(false);
  const [isUserValid, setIsUserValid] = useState<boolean>(false);
  const [addUser, setAddUser] = useState<string>('');
  const [addTitle, setAddTitle] = useState<string>('');
  const [addTodos, setAddTodos] = useState<Todo[]>(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = addTitle.trim();
    const newIndex = Math.max(...addTodos.map(todo => todo.id)) + 1;

    setIsTitleValid(!title);
    setIsUserValid(!addUser);

    if (title && addUser) {
      const user = getUserById(+addUser);
      const newTodo: Todo = {
        id: newIndex,
        title,
        completed: false,
        userId: 1,
        user,
      };

      setAddTodos([
        ...addTodos,
        newTodo,
      ]);

      setAddTitle('');
      setAddUser('');
    }
  };

  const handleSetAddUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAddUser(event.target.value);
    setIsUserValid(false);
  };

  const handleSetAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTitle(event.target.value);
    setIsTitleValid(false);
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
          <span className="label">Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={addTitle}
            onChange={handleSetAddTitle}
          />
          <span className="error">
            {isTitleValid && ('Please enter a title')}
          </span>
        </div>

        <div className="field">
          <span className="label">User: </span>
          <select
            name="User"
            data-cy="userSelect"
            value={addUser}
            onChange={handleSetAddUser}
          >
            <option disabled value="">Choose a user</option>
            {
              usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {`${user.name}`}
                </option>
              ))
            }
          </select>

          <span className="error">
            {isUserValid && ('Please choose a user')}
          </span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <div className="App">
          <TodoList todos={addTodos} />
        </div>
      </section>
    </div>
  );
};
