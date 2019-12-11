import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const Selector = ({ inputValue, usersList, handleInput, selectedUserId, handleUserChange, handleFormSubmit, hasInputError, hasNameError }) => (
  <form onSubmit={handleFormSubmit}>
    <input
      type="text"
      value={inputValue}
      maxLength="30"
      onChange={handleInput}
    />
    {hasInputError && (
      <span className="error_massage">Please, enter a task!</span>
    )}

    <section>
      <select
        value={selectedUserId}
        onChange={handleUserChange}
      >
        <option value="0">Select an User</option>
        {usersList.map(user => (
          <option
            value={user.id}
            key={user.id}
          >
            {user.username}
          </option>
        ))}
      </select>
      {hasNameError && (
        <span className="error_massage">Please, chose a name!</span>
      )}
    </section>

    <button type="submit">Add</button>
  </form>

);

Selector.propTypes = {
  inputValue: PropTypes.string.isRequired,
  usersList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleInput: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  hasInputError: PropTypes.bool.isRequired,
  hasNameError: PropTypes.bool.isRequired,
};

export default Selector;
