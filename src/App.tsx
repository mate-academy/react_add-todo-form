import './App.scss';
import { useState, FormEvent } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);

  const submit = (event: FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      setHasTitleError(true);
    }

    if (userId === 0) {
      setHasUserError(true);
    }

    if (title.length > 0 && userId > 0) {
      setNewTodos((prevState) => {
        const largestIdInTodos
          = Math.max(...prevState.map(todo => todo.id));
        const newTodo = {
          completed: false,
          id: largestIdInTodos + 1,
          title,
          user: getUser(userId),
          userId,
        };

        return [...prevState, newTodo];
      });

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={submit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              id="title"
              placeholder="Type the title of the todos"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value.trim());

                if (hasTitleError) {
                  setHasTitleError(false);
                }
              }}
            />

            {hasTitleError
              && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            Choose a user:
            <select
              data-cy="userSelect"
              id="title"
              value={userId}
              onChange={(event) => {
                setUserId(Number(event.target.value));

                if (hasUserError) {
                  setHasUserError(false);
                }
              }}
            >
              <option value="">
                Choose a user
              </option>

              {usersFromServer.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>

            {hasUserError
              && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList newTodos={newTodos} />
      </section>
    </div>
  );
};
