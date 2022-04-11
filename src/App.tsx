import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos
  .map(todo => {
    const user = users.find(u => u.id === todo.userId) || null;

    return {
      ...todo,
      user,
    };
  });

const App: React.FC = () => {
  const [titleTodo, setTitleTodo] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserNameErr, setHasUserNameErr] = useState(false);

  const [todosFinal, setTodosFinal] = useState(preparedTodos);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTodo(event.target.value);
    setHasTitleError(false);
  };

  const onUserSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserNameErr(false);
  };

  const onSubmitChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(titleTodo === '');

    setHasUserNameErr(userId === 0);

    if (userId && titleTodo) {
      const newTodo = {
        userId,
        id: todosFinal.length + 1,
        title: titleTodo,
        completed: false,
        user: users.find(user => user.id === userId) || null,
      };

      setTodosFinal([...todosFinal, newTodo]);
    }
  };

  return (
    <div className="App">
      <h1>Static list of todos</h1>

      <form
        onSubmit={onSubmitChange}
      >
        <div>
          <input
            className="input"
            placeholder="Type your task.."
            value={titleTodo}
            onChange={onTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div>
          <select
            value={userId}
            onChange={onUserSelectChange}
          >
            <option value="0">Choose user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserNameErr && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit">Add</button>
      </form>
      <TodoList todos={todosFinal} />
    </div>
  );
};

export default App;
