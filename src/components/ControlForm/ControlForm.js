import React from 'react';
import PropTypes from 'prop-types';
import './ControlForm.css';

export const ControlForm = ({
  users,
  select,
  input,
  submit,
  newTask,
  selectValue,
  deleteDone,
}) => (
  <form
    onSubmit={submit}
    className="list-group-item list-group-item-action active"
  >
    <div className="d-flex justify-content-between align-items-end">
      <div className="col-md-3">
        <label htmlFor="inputTask">Enter task name</label>
        <input
          id="inputTask"
          type="text"
          placeholder="Write task here"
          onChange={input}
          value={newTask}
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="select" р>Select user</label>
        <select
          id="select"
          value={selectValue}
          onChange={select}
          className="form-control"
        >
          <option disabled value="users">Users</option>
          {users.map(user => (
            <option key={user.id} value={user.name}>{user.name}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <button
          type="submit"
          className="btn btn-secondary"
        >
          Update ToDoList
        </button>
      </div>
      <div className="col-md-3">
        <button
          type="button"
          onClick={deleteDone}
          className="btn btn-secondary"
        >
          Is done Delete
        </button>
      </div>
    </div>
  </form>
);

ControlForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  select: PropTypes.func.isRequired,
  input: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  deleteDone: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
};
