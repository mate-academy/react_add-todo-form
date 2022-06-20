import React, { useState } from 'react';
import './App.css';
import classNames from 'classnames';

import users from './api/users';
import todos from './api/todos';
import { TodosList } from './components/TodoList/TodosList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [todosList, setTodosList] = useState(preparedTodos);
  const [userName, setUserName] = useState('0');
  const [todoTitle, setTodoTitle] = useState('');
  const [errorType, setErrorType] = useState('');

  const getErrorToShow = () => {
    if (!todoTitle.length && userName.length < 2) {
      setErrorType('both');

      return;
    }

    if (!todoTitle.length) {
      setErrorType('title');

      return;
    }

    if (userName.length < 2) {
      setErrorType('user');
    }
  };

  const addTodo = (owner: string, title: string) => {
    const theUser = users.find(el => el.name === owner) || null;

    if (!theUser || !todoTitle.length) {
      getErrorToShow();

      return;
    }

    if (errorType) {
      setErrorType('fixed');
    }

    setTodosList(
      [...todosList,
        {
          userId: theUser?.id,
          id: todosList.length + 1,
          title,
          completed: false,
          user: theUser,
        }],
    );

    setTodoTitle('');
    setUserName('0');
    setTimeout(() => {
      setErrorType('');
    }, 2500);
  };

  return (
    <div className="App">
      <h1 className="title">Check this out, it adds todos!</h1>
      {(errorType) && (
        <div className={classNames('block', {
          'has-background-success': errorType === 'fixed',
          'has-background-warning has-text-danger': errorType !== 'fixed',
        })}
        >
          {errorType === 'title' && (
            // eslint-disable-next-line max-len
            'No one will tell you you\'re doing wrong if no one knows what you\'re doing'
          )}
          {errorType === 'both' && (
            'Come on dude, dont mess with me. You wanted to do something'
          )}
          {errorType === 'user' && (
            'You better set the task owner if you want the task to be done'
          )}
          {errorType === 'fixed' && (
            'Cant believe you finished it :*'
          )}
        </div>
      )}
      <form method="GET" className="level level-item">
        <div className="field">
          <div className="is-info block">
            <div className="container">
              <input
                className="input"
                type="text"
                placeholder="What are we going to do?"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                data-cy="titleInput"
              />
            </div>
          </div>
          <div className="select block">
            <select
              name="user"
              id="choose-user"
              value={userName}
              data-cy="user-select"
              onChange={(e) => setUserName(e.target.value)}
            >
              <option disabled value="0">
                Choose your fighter
              </option>
              {users.map(user => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={classNames('button is-rounded', {
              'is-success is-outlined': userName.length > 1 && todoTitle.length,
              'is-danger': userName.length < 2 || !todoTitle.length,
            })}
            onClick={(e) => {
              e.preventDefault();
              addTodo(userName, todoTitle);
            }}
          >
            {userName.length > 1 && todoTitle.length
              ? 'Finish it!'
              : 'Add todo'}
          </button>
        </div>
      </form>
      <div>
        <TodosList todos={todosList} />
      </div>
    </div>
  );
};

export default App;
