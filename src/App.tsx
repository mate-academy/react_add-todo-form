import React, { useState } from 'react';
import TodoList from './components/TodoList';

import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer
  .map(todo => {
    const user = users.find(u => u.id === todo.userId) || null;

    return {
      ...todo,
      user,
    };
  });

const App: React.FC = () => {
  const [todos, setTodos] = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [nextTodoId, setNextTodoId] = useState(todos.length + 1);
  const [titleIsInvalid, setTitleIsInvalid] = useState(false);
  const [userIsInvalid, setUserIsInvalid] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleIsInvalid(true);

      return;
    }

    if (!userId) {
      setUserIsInvalid(true);

      return;
    }

    const todo = {
      id: nextTodoId,
      title,
      completed: false,
      userId: +userId,
      user: users.find(u => u.id === +userId) || null,
    };

    setTodos([...todos, todo]);
    setNextTodoId(nextTodoId + 1);
    setTitle('');
    setUserId('');
  };

  const onSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserIsInvalid(false);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.match(/[^ 0-9a-zа-яіїєёыъA-ZА-ЯІЇЄЁЫЪ]+/)) {
      setTitle(event.target.value);
      setTitleIsInvalid(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="get" onSubmit={onSubmit} className="add-user">
        <div className="input-container">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
          />
          {titleIsInvalid && <span className="error">Please enter a title</span>}
        </div>

        <div className="input-container">
          <select
            name="user"
            id="user"
            value={userId}
            onChange={onSelectUser}
          >
            <option value="">Choose user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {userIsInvalid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit">Add</button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
