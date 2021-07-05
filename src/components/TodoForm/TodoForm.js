import React from 'react';
import PropTypes from 'prop-types';

const TodoForm = (
  {
    usersList,
    changeTask,
    changeUserId,
    value,
    id,
    addNewTask,
    inputValue,
    personError,
    titleError,
  },
) => (
  <form onSubmit={(e) => {
    e.preventDefault();
  }}
  >
    <label htmlFor="title" className="form__title">
      <input
        type="text"
        id="title"
        onChange={changeTask}
        value={inputValue}
      />
    </label>
    {titleError || <span> Please enter the title </span>}
    <br />
    <select
      onChange={changeUserId}
      value={value}
      className="form__person"
    >
      <option value="0">Choose person</option>
      {usersList.map(item => (
        <option value={item.id} key={item.id}>{item.name}</option>
      ))}
    </select>
    {personError || <span>Please choose a user</span>}
    <br />
    <button
      onClick={() => addNewTask(id)}
      className="form__btn"
      type="submit"
    >
      add task
    </button>
  </form>
);

TodoForm.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,

  })).isRequired,
  changeTask: PropTypes.func.isRequired,
  changeUserId: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  addNewTask: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  personError: PropTypes.bool.isRequired,
  titleError: PropTypes.bool.isRequired,
};

export default TodoForm;
