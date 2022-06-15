import React, { useState } from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import './components/FormTitle/Form.scss';
import { FormTitle } from './components/FormTitle';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(preparedTodos);
  const [checks, setChecks] = useState('checked');

  const addTodo = () => {
    const selectedUser = users.find((user) => user.name === userName);

    const newTodo = {
      userId: selectedUser ? selectedUser.id : 0,
      id: visibleTodos.length + 1,
      title: `${title}`,
      completed: false,
      user: selectedUser || null,
    };

    setVisibleTodos(() => ([...visibleTodos, newTodo]));
    setTitle('');
    setUserName('');
  };

  const handleClick = () => {
    if (userName.length === 0) {
      setChecks('user name error');

      return;
    }

    if (title.length === 0) {
      setChecks('title error');

      return;
    }

    addTodo();
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setChecks('checked');
  };

  const changeUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setChecks('checked');
  };

  return (
    <div className="App">
      <div className="form">
        <h2 className="form__header">Add a new todo:</h2>

        <form onSubmit={(event) => event.preventDefault()}>
          <FormTitle
            title={title}
            changeTitle={changeTitle}
            checks={checks}
          />

          <div>
            <select
              className="form__userName"
              name="userName"
              data-cy="userSelect"
              value={userName}
              onChange={changeUserName}
            >
              <option value="">Choose user</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            {checks === 'user name error' && (
              <span className="form__userName-error">
                &emsp;Please choose a user!
              </span>
            )}
          </div>

          <button type="submit" className="form__button" onClick={handleClick}>
            Add
          </button>
        </form>
      </div>

      <h3 className="App__underheader">
        <span>Number of users:&emsp;</span>
        {users.length}
      </h3>

      <TodoList todos={visibleTodos} />
    </div>
  );
};

export default App;
