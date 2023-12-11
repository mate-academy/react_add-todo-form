// imports
import { FC, FormEvent, useState } from 'react';
import './App.scss';
import { User } from './types';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

// merging data from server
const todosWithUsers = todosFromServer
  .map(todo => (
    {
      ...todo,
      user: usersFromServer
        .find(user => user.id === todo.userId),
    }
  ));

// component
export const App: FC = () => {
  // state
  const [todos, setTodos] = useState(todosWithUsers);
  const [formData, setFormData] = useState({ title: '', user: '' });
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [userIsValid, setUserIsValid] = useState(false);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  // handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();

    setShowTitleError(!!value);
    setTitleIsValid(!!value);

    setFormData(oldData => ({
      ...oldData,
      title: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setShowUserError(!!value);
    setUserIsValid(!!value);

    setFormData(oldData => ({
      ...oldData,
      user: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!titleIsValid || !userIsValid) {
      if (!titleIsValid) {
        setShowTitleError(true);
      }

      if (!userIsValid) {
        setShowUserError(true);
      }

      return;
    }

    const thisUser = usersFromServer
      .find(user => user.name === formData.user) as User;

    const thisId = ([...todos].sort((a, b) => b.id - a.id)[0].id + 1);

    setTodos(oldTodos => ([
      ...oldTodos,
      {
        id: thisId,
        title: formData.title,
        completed: false,
        userId: thisUser.id,
        user: thisUser,
      },
    ]));

    setFormData({
      title: '',
      user: '',
    });

    setTitleIsValid(false);
    setUserIsValid(false);
    setShowTitleError(false);
    setShowUserError(false);
  };

  // rendering the component
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleSubmit}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={formData.title}
              onChange={handleInputChange}
            />
            {
              (showTitleError && !titleIsValid)
              && <span className="error">Please enter a title</span>
            }
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              id="userSelect"
              data-cy="userSelect"
              value={formData.user}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Choose a user</option>
              {
                usersFromServer.map(user => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))
              }
            </select>
            {
              (showUserError && !userIsValid)
              && <span className="error">Please choose a user</span>
            }
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
