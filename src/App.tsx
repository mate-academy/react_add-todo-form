import React, { useState, useMemo } from 'react';
import './App.scss';
import Completed from './image/Completed.png';
import NoCompl from './image/CrossMark.png';
import Add from './image/add.png';
import User from './image/username.png';
import Title from './image/title.png';

import todos from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [todoList, addTodoToList] = useState(todos);
  const [user, addUser] = useState('');
  const [title, addTitle] = useState('');
  const [status, changeStatus] = useState('not completed');
  const [titleError, showTitleError] = useState<string | null>(null);
  const [userError, showUserError] = useState<string | null>(null);

  const addTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    addTitle(newTitle.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, ''));
    showTitleError(null);
  };

  const validator = () => {
    if (!user) {
      showUserError('Please choose a user');
    }

    if (!title.trim()) {
      showTitleError('Please enter the title');
    }

    if (!user || !title.trim()) {
      return false;
    }

    return true;
  };

  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (validator()) {
      const preparedUser = users.find(({ name }) => name === user);

      const newTodo = {
        userId: preparedUser ? preparedUser.id : 0,
        id: todoList[todoList.length - 1].id + 1,
        title,
        completed: status === 'completed',
      };

      addTodoToList((current) => [...current, newTodo]);
      addTitle('');
      addUser('');
      changeStatus('not completed');
    }
  };

  const newTodosArr = (todosArr: Omit<Todo, 'user'>[]) => todosArr
    .map((todoItem) => ({
      ...todoItem,
      user: users.find((todoUser) => todoUser.id === todoItem.userId),
    }));

  const preparedTodos: Todo[] = useMemo(
    () => newTodosArr(todoList), [todoList],
  );

  return (
    <div className="app">
      <form className="app__form" onSubmit={addTodo}>
        <div className="app__form--block">
          <h2 className="form__title">Create a new todo!</h2>

          <label className="app__form--label">
            <img
              src={Title}
              alt="Title"
              className="app__form--userimage"
            />
            <input
              type="text"
              name="title"
              className="app__form--inputTitle"
              value={title}
              placeholder="Title"
              onChange={addTodoTitle}
            />
          </label>
          {titleError && <span>{titleError}</span>}

          <div className="app__form--label">
            <img
              src={User}
              alt="User"
              className="app__form--userimage"
            />

            <select
              name="user"
              className="app__form--select"
              value={user}
              onChange={(event) => {
                addUser(event.target.value);
                showUserError(null);
              }}
            >
              <option value="">Choose a user</option>
              {users.map(({ name, id }) => (
                <option value={name} key={id}>{name}</option>
              ))}
            </select>
          </div>
          {userError && <span>{userError}</span>}

          <div>
            <label htmlFor="status_true">
              <img
                src={Completed}
                alt="Completed"
                className="app__form--image"
              />
            </label>
            <input
              type="radio"
              name="status"
              id="status_true"
              value="completed"
              checked={status === 'completed'}
              onChange={(event) => changeStatus(event.target.value)}
            />

            <label htmlFor="status_false">
              <img
                src={NoCompl}
                alt="NoCompleted"
                className="app__form--image"
              />
            </label>
            <input
              type="radio"
              name="status"
              id="status_false"
              value="not completed"
              checked={status === 'not completed'}
              onChange={(event) => changeStatus(event.target.value)}
            />
          </div>

          <button type="submit" className="app__form--button">
            <img
              src={Add}
              alt="Add"
            />
          </button>
        </div>
      </form>
      <TodoList todos={preparedTodos} />
    </div>
  );
};

export default App;
