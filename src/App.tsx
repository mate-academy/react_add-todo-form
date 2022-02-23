import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

const preparedTodoItems = todos.map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectUserId, setSelectUserId] = useState('');
  const [newTodos, setNewTodos] = useState([...preparedTodoItems]);

  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);
  const nextTodoId = newTodos.length + 1;

  const getSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);

    setUserError(!selectUserId);

    if (title && selectUserId) {
      const nextTodos = {
        id: nextTodoId,
        userId: +selectUserId,
        title,
        completed: false,
        user: users.find((user) => user.id === +selectUserId) || null,
      };

      setNewTodos([...newTodos, nextTodos]);
      setTitle('');
      setSelectUserId('');
    }
  };

  const getSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectUserId(event.target.value);
    setUserError(false);
  };

  const getChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const getChangeCompleted = (event: React.ChangeEvent<HTMLInputElement>, newTodo: Todo) => {
    const { checked } = event.target;
    const changeCompleted = newTodos.map((todo) => {
      if (todo.id === newTodo.id) {
        return {
          ...todo,
          completed: checked,
        };
      }

      return todo;
    });

    setNewTodos([...changeCompleted]);
  };

  return (
    <div className="App container is-max-desktop">
      <h1 className="title is-1 title-centered">Add todo form</h1>

      <form
        onSubmit={getSubmit}
      >

        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <div className="select">
              <select
                name="user"
                value={selectUserId}
                onChange={getSelectedUser}
              >
                <option value="">Select user</option>

                {users.map(user => (

                  <option
                    value={user.id}
                    key={user.id}
                  >
                    {user.name}
                  </option>

                ))}
              </select>

              {hasUserError && <span className="help is-danger">Please choose a user</span>}
            </div>
          </div>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Title"
              value={title}
              onChange={getChangeTitle}
            />
            {hasTitleError && <span className="help is-danger">Please enter a title</span>}
          </div>
          <div className="control">
            <button className="button is-primary" type="submit">Submit</button>
          </div>
        </div>

      </form>

      <ul className="todo">

        {newTodos.map(todoItem => (
          <li className="todo__item card" key={todoItem.id}>
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <div className="todo_todoInfo">
                    <h3 className="todo__title">
                      {todoItem.title}
                    </h3>
                    <p className="todo__status">
                      {'Status: '}
                      <input
                        type="checkbox"
                        name="completed"
                        checked={todoItem.completed}
                        onChange={
                          (event: React.ChangeEvent<HTMLInputElement>, newTodo = todoItem) => {
                            return getChangeCompleted(event, newTodo);
                          }
                        }
                      />
                      {(todoItem.completed) ? ' Done! ' : ' In progress... '}
                    </p>
                    <div className="todo__userInfo">
                      <>
                        <p className="todo__userName">
                          {'Author: '}
                          {todoItem.user?.name}
                        </p>
                        <p className="todo__userEmail">
                          {'Email: '}
                          {todoItem.user?.email}
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default App;
