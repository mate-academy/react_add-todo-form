import {
  FC, useState, FormEventHandler, ChangeEventHandler, ChangeEvent,
} from 'react';

import classNames from 'classnames';
import { LinkedTodo } from './typedef';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todosFromServer from './api/todos';

import './App.scss';

const linkedTodos: LinkedTodo[] = todosFromServer.map((todo) => {
  const linkedUser = users.find(({ id }) => id === todo.userId);

  return {
    ...todo,
    userName: (linkedUser)
      ? linkedUser.username
      : 'Anonymous',
  };
});

const availableUserNames = users.map(({ username }) => username);

const App: FC = () => {
  const [todos, updateTodos] = useState(linkedTodos);
  const [newCompleted, setNewCompleted] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const addTodoHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    let isFormValid = true;

    if (newTitle.length < 1) {
      setTitleError(true);
      isFormValid = false;
    }

    if (!availableUserNames.includes(newUsername)) {
      setUsernameError(true);
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    const newTodo: LinkedTodo = {
      id: todos.length + 1,
      title: newTitle,
      userName: newUsername,
      completed: newCompleted,
    };

    updateTodos((prevs) => [newTodo, ...prevs]);

    setNewTitle('');
    setNewUsername('');
  };

  const changeTitleHandler: ChangeEventHandler<HTMLInputElement> = (
    { target }: ChangeEvent<HTMLInputElement>,
  ) => {
    const validator = /[^а-яА-ЯёЁa-zA-Z 0-9]/;

    if (!target.value.match(validator)) {
      setNewTitle(target.value);
      setTitleError(false);
    }
  };

  const changeUsernameHandler: ChangeEventHandler<HTMLSelectElement> = (
    { target }: ChangeEvent<HTMLSelectElement>,
  ) => {
    setNewUsername(target.value);
    setUsernameError(false);
  };

  return (
    <div className="App">
      <form
        action="GET"
        className={classNames(
          'TodoForm App__todoForm',
          {
            'TodoForm--completed': newCompleted,
            'TodoForm--invalid': titleError || usernameError,
          },
        )}
        onSubmit={addTodoHandler}
      >
        <input
          type="checkbox"
          name="completed"
          id="isNewCompleted"
          className="TodoForm__completedToggler"
          checked={newCompleted}
          onChange={({ target }) => setNewCompleted(target.checked)}
        />

        <label
          htmlFor="isNewCompleted"
          className="TodoForm__hint"
        >
          {
            titleError || usernameError
              ? `
                ${titleError ? 'No title' : ''}
                ${usernameError ? 'No username' : ''}
              ` : 'Click on card to switch'
          }
        </label>

        <hr className="TodoForm__strip" />

        <div className="InputContainer">
          <input
            name="title"
            id="newTitle"
            className="TodoForm__title InputContainer__item"
            placeholder="Task title"
            value={newTitle}
            onChange={changeTitleHandler}
          />
        </div>

        <div className="InputContainer">
          <select
            name="userName"
            id="newUserName"
            className="TodoForm__userName InputContainer__item"
            value={newUsername}
            onChange={changeUsernameHandler}
          >
            <option value="" disabled>
              Username
            </option>

            {
              availableUserNames.map((userName) => (
                <option
                  value={userName}
                  key={userName}
                >
                  {userName}
                </option>
              ))
            }
          </select>

          <button
            type="submit"
            className="TodoForm__submitButton InputContainer__item"
          >
            Add todo
          </button>
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
