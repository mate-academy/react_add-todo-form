import React from 'react';
import './Form.css';

export const Form = ({
  add,
  handleTodo,
  newTodo,
  users,
  hasNameError,
  hasTodoError,
}) => {

  return (
    <form
        className="addTodo"
        onSubmit={add}
      >
        <div className="input__wrapper">
          <div className="input__container">
            <select
              name="chosedUser"
              className="form-select"
              onChange={handleTodo}
            >
              <option>Choose a user</option>
              {users.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
            {hasNameError && (
              <span className="nameError">Please chose a user</span>
            )}
          </div>
          <div className="input__container">
            <input
              type="text"
              name="newTodo"
              className="form-control form-control-lg"
              placeholder="Please enter the title"
              value={newTodo}
              onChange={handleTodo}
            />
            {hasTodoError && (
              <span className="error">Please enter the title</span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
  )
}

