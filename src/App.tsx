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

class CustomTodo implements Todo {
  id: number;

  userId: number;

  title: string;

  completed: boolean;

  user: User | null;

  constructor(
    userId: number,
    todoTitle: string,
    currToDos: Todo[],
    completed = false,
  ) {
    this.userId = +userId;
    this.title = todoTitle;
    this.completed = completed;
    this.user = getUser(userId);
    this.id = this.createToDoId(currToDos);
  }

  createToDoId = (toDos: Todo[]) => {
    const idS = toDos.map(todo => todo.id);

    return Math.max(...idS) + 1;
  };
}

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputUser, setInputUser] = useState(0);
  const [toDosForRender, setToDosForRender] = useState(todos);
  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputTitle || !inputUser) {
      setTitleError(!inputTitle);
      setUserError(!inputUser);

      return;
    }

    setToDosForRender(
      (curr) => [...curr, new CustomTodo(inputUser, inputTitle, curr)],
    );
    setInputTitle('');
    setInputUser(0);
    setTitleError(!inputTitle);
    setUserError(!inputUser);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === 'title') {
      setInputTitle(e.target.value);
      setTitleError(false);
    } else {
      setInputUser(+e.target.value);
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/"
        method="get"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Title"
              value={inputTitle}
              onChange={(e) => handleChange(e)}
            />
          </label>

          {isTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              id="user"
              name="user"
              value={inputUser}
              onChange={(e) => handleChange(e)}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ name, id }) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {isUserError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={toDosForRender} />
    </div>
  );
};
