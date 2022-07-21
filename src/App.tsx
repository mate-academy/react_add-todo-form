import React, { useState } from 'react';

import { TodoLis } from './components/TodoList/TodoList';

import './App.scss';

import users from './api/users';
import todos from './api/todos';

const listTodoWithUser = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [listTodo, setListTodo] = useState([...listTodoWithUser]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titelIsEmpty, setTitelISEmpty] = useState('');
  const [idIsEmpty, setIdIsEmpty] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitelISEmpty('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIdIsEmpty('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.length) {
      setTitelISEmpty('Please enter the title');

      return;
    }

    if (!userId) {
      setIdIsEmpty('Please choose a user');

      return;
    }

    setListTodo([{
      user: users.find(
        user => user.id === userId,
      ) || null,
      userId,
      id: todos[todos.length - 1].id + 1,
      title,
      completed: false,
    }, ...listTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>

        <div className="field">
          <label className="label" htmlFor="#username">Name</label>
          <div className="control">
            <input
              id="username"
              className="input"
              type="text"
              placeholder="Text input"
              data-cy="titleInput"
              onChange={handleTitleChange}
              value={title}
            />
          </div>
          <div className="help is-danger">{titelIsEmpty}</div>
          <div className="field">
            <label className="label" htmlFor="#userId">User</label>
            <div className="control">
              <div className="select">
                <select
                  onChange={handleUserChange}
                  value={userId}
                  id="userId"
                  data-cy="userSelect"
                >
                  <option value={0} disabled>Choose a user</option>
                  {users.map(user => {
                    return (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <span className="help is-danger">{idIsEmpty}</span>
          </div>
        </div>

        <div className="control">
          <button className="button is-dark" type="submit">Add</button>
        </div>
      </form>
      <TodoLis todoList={listTodo} />
    </div>
  );
};

export default App;
