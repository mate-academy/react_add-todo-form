import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList, User } from './react-app-env';
import { TodosList } from './Components/TodosList';

const getUserById = (userId: number): User | null => {
  return users.find(user => userId === user.id) || null;
};

const todoArray: TodoList[] = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const App: React.FC = () => {
  const [todosList, setTodosList] = useState<TodoList[]>([...todoArray]);
  const [newTodo, setNewTodo] = useState('');
  const [selectUserId, setSelectUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [compliteStatus, setCompliteStatus] = useState(false);

  const addTodo = (title: string, userId: number) => {
    const todo = {
      userId,
      id: todosList.length + 1,
      title,
      completed: compliteStatus,
      user: getUserById(selectUserId),
    };

    setTodosList((todoList) => ([...todoList, todo]));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!newTodo);
    setUserError(!selectUserId);

    if (newTodo && selectUserId) {
      addTodo(newTodo, selectUserId);
      setNewTodo('');
      setSelectUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <div className="todo__container">
        <form
          onSubmit={handleSubmit}
        >
          <div className="form__container">
            <span className="form__item">
              <p>
                <select
                  className={classNames({ error: userError })}
                  value={selectUserId}
                  onChange={(event) => {
                    setSelectUserId(+event.target.value);
                    setUserError(false);
                  }}
                >
                  <option value="0" disabled>
                    Choose a user
                  </option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </p>

              {userError && (
                <p className="error__message">
                  Please choose a user
                </p>
              )}
            </span>

            <span className="form__item">
              <p>
                <label
                  htmlFor="title"
                  className="form__title"
                >
                  Title
                  {' '}
                </label>
                <input
                  type="text"
                  id="title"
                  className={classNames({ error: titleError })}
                  placeholder="Enter todo"
                  value={newTodo}
                  onChange={(event) => {
                    setNewTodo(event.target.value);
                    setTitleError(false);
                  }}
                />
              </p>

              {titleError && (
                <p className="error__message">
                  Please enter a todo
                </p>
              )}
            </span>

          </div>

          <p>
            <input
              type="checkbox"
              id="complited"
              className="complited"
              onChange={() => (setCompliteStatus(true))}
            />
            <label
              htmlFor="complited"
              className="complited"
            >
              Complited
            </label>
          </p>

          <button
            type="submit"
            className="button"
          >
            Add
          </button>
        </form>

        <p>
          <span>TodoList: </span>
        </p>
        <TodosList todosList={todosList} />
      </div>
    </div>
  );
};

export default App;
