import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './react-app-env';

const prevTodoItems = todos.map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectUserId, setUserIdSelect] = useState('');
  const [updatedTodos, setNewTodos] = useState([...prevTodoItems]);

  const [noEnteredTitle, setTitleError] = useState(false);
  const [noEnteredUser, setUserError] = useState(false);
  const nextTodoId = updatedTodos.length + 1;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);

    setUserError(!selectUserId);

    if (title && selectUserId) {
      const nextTodos = {
        id: nextTodoId,
        userId: parseInt(selectUserId, 10),
        title,
        completed: false,
        user: users.find((user) => user.id === +selectUserId) || null,
      };

      setNewTodos([...updatedTodos, nextTodos]);
      setTitle('');
      setUserIdSelect('');
    }
  };

  const getSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setUserIdSelect(event.target.value);
    setUserError(false);
  };

  const getChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const getChangeCompleted = (event: React.ChangeEvent<HTMLInputElement>,
    newTodo: Todo) => {
    const { checked } = event.target;
    const changeCompleted = updatedTodos.map((todo) => {
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
        onSubmit={onSubmit}
      >

        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <div className="select is-primary">
              <select
                name="user"
                value={selectUserId}
                onChange={getSelectedUser}
              >
                <option value="" disabled>Select user</option>

                {users.map(user => (

                  <option
                    value={user.id}
                    key={user.id}
                  >
                    {user.name}
                  </option>

                ))}
              </select>

              {noEnteredUser
                && <span className="help is-danger"> Field is required!</span>}
            </div>
          </div>
          <div className="control">
            <input
              className="input is-info"
              type="text"
              placeholder="Title"
              value={title}
              onChange={getChangeTitle}
            />
            {noEnteredTitle
              && <span className="help is-danger">Field is required!</span>}
          </div>
          <div className="control">
            <button className="button is-success" type="submit">Submit</button>
          </div>
        </div>

      </form>

      <ul className="todo">

        {updatedTodos.map(todoItem => (
          <li className="todo__item card" key={todoItem.id}>
            <div className="card">
              <div className="card-content">
                <div className="content">
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
                        (event: React.ChangeEvent<HTMLInputElement>,
                          newTodo = todoItem) => {
                          return getChangeCompleted(event, newTodo);
                        }
                      }
                    />
                    {(todoItem.completed) ? ' Done! ' : ' In progress... '}
                  </p>
                  <div className="todo__userInfo">
                    <>
                      <p className="todo__userName">
                        {'User Name: '}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
