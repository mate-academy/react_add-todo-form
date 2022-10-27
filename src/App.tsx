import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './Types';

import { TodoList } from './components/TodoList';

export const App = () => {
  const users = usersFromServer;
  const [title, setTitle] = useState('');
  const [choosenUser, setChoosenUser] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setChoosenUser(0);
  };

  const canConfirmForm = () => {
    if (!title) {
      setTitleError(true);
    }

    if (!choosenUser) {
      setUserError(true);
    }
  };

  const handlerSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: User | undefined = users
      .find(person => person.id === choosenUser);
    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    canConfirmForm();

    if (user && title && choosenUser) {
      setTodos(currentTodos => ([
        ...currentTodos,
        {
          id: newId,
          title,
          completed: false,
          userId: user.id,
        },
      ]));
    }

    if (title && choosenUser) {
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handlerSubmitForm}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter the title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
          </label>
          {titleError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={choosenUser}
              onChange={(event) => {
                setChoosenUser(+event.target.value);
                setUserError(false);
              }}
            >
              <option
                value="0"
                disabled

              >
                Choose a user
              </option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError
            && (<span className="error">Please choose a user</span>)}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList
          todos={todos}
        />
      </section>
    </div>
  );
};
