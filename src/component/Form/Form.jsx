import React from 'react';
import PropTypes from 'prop-types';
import { SelectUser } from '../SelectUser';

export const Form = (props) => {
  const {
    selectedUserId,
    title,
    changeTitleHandler,
    selectUserHandler,
    addTodo,
    users,
  } = props;

  return (
    <form method="GET">
      <label>
        <input
          type="text"
          name="title"
          placeholder="Please enter the title"
          value={title}
          onChange={changeTitleHandler}
        />
      </label>
      <SelectUser
        selectUserHandler={selectUserHandler}
        selectedUserId={selectedUserId}
        users={users}
      />
      <button
        type="submit"
        onClick={addTodo}
      >
        Add
      </button>
    </form>
  );
};

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  changeTitleHandler: PropTypes.func.isRequired,
  selectUserHandler: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};
