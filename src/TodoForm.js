import React from 'react';
import PropTypes, { object } from 'prop-types';

const TodoForm = ({
  currentValue, newTask, currentChooseUserValue, chooseUserName,
  users, currentStatus, chooseStatusTodo, hiddenHint, addNewTodo,
}) => (
  <form
    className="todo__form form"
    onSubmit={e => e.preventDefault()}
  >
    <div className="form__wrap">
      <label htmlFor="newTask">Write a new task: </label>
      <input
        type="text"
        id="newTask"
        value={currentValue}
        onChange={e => newTask(e)}
      />
    </div>
    <div className="form__wrap">
      <label htmlFor="chooseUser">Choose a user: </label>
      <select
        id="chooseUser"
        value={currentChooseUserValue}
        onChange={e => chooseUserName(e)}
      >
        <option value="" hidden>
          Choose here
        </option>
        {users.map(user => (
          <option
            value={user.id}
            key={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
    </div>
    <div className="form__wrap">
      <label htmlFor="chooseStatus">Select status for new todo: </label>
      <select
        id="chooseStatus"
        value={`${currentStatus}`}
        onChange={e => chooseStatusTodo(e)}
      >
        <option value="" hidden>Choose here</option>
        <option value="true">Done</option>
        <option value="false">In process</option>
      </select>
    </div>
    <button
      type="button"
      onClick={() => addNewTodo()}
    >
      Add todo
    </button>
    {hiddenHint
      ? (
        <p className="form__hint">
          Please, write 4 or more symbols
          {' '}
          <br />
          {' '}
          and choose all parameters!
        </p>
      )
      : <p />}
  </form>
);

TodoForm.propTypes = {
  currentValue: PropTypes.string.isRequired,
  currentChooseUserValue: PropTypes.number.isRequired,
  chooseUserName: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(object).isRequired,
  hiddenHint: PropTypes.bool.isRequired,
  newTask: PropTypes.func.isRequired,
  currentStatus: PropTypes.bool.isRequired,
  chooseStatusTodo: PropTypes.func.isRequired,
  addNewTodo: PropTypes.func.isRequired,
};

export default TodoForm;
