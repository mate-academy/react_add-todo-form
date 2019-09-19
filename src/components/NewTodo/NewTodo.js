import React from 'react';
import classNames from 'classnames';

const NewTodo = ({
  usersList,
  selectedUser,
  addTodo,
  inputTodoValue,
  onChangeSelectOfUser,
  onChangeInputOfTodo,
  inputTodoError,
  selectUserError,
}) => {
  const inputTodoClass = classNames(
    'form-control',
    {
      'is-invalid': inputTodoError,
    }
  );
  const selectUserClass = classNames(
    'form-control',
    {
      'is-invalid': selectUserError,
    }
  );

  return (
    <div className="container mb-5">
      <div className="row">
        <form className="col-lg-6 mx-auto" onSubmit={addTodo}>
          <div className="form-group row">
            <label
              className="col-sm-3 col-form-label"
              htmlFor="todo-text"
            >
              Todo text:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                value={inputTodoValue}
                onChange={onChangeInputOfTodo}
                id="todo-text"
                className={inputTodoClass}
              />
              <div className="invalid-feedback">
                Please enter the title
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label
              className="col-sm-3 col-form-label"
              htmlFor="todo-user"
            >
              User:
            </label>
            <div className="col-sm-9">
              <select
                value={selectedUser}
                onChange={onChangeSelectOfUser}
                className={selectUserClass}
                id="todo-user"
              >
                <option key="Choose a user" value={0}>Choose a user</option>
                {usersList.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              <div className="invalid-feedback">
                Please choose a user
              </div>
            </div>
          </div>
          <div className="form-group row justify-content-end">
            <div className="col-sm-9 text-right">
              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTodo;
