import React from 'react';
import PropTypes from 'prop-types';

export const Select = (props) => {
  const { value, handleChange, users, error } = props;

  return (
    <>
      <label htmlFor="chooseUser">Choose a user</label>

      <select
        id="chooseUser"
        name="chosenUser"
        className="ui search dropdown"
        value={value}
        onChange={handleChange}
      >
        <option value=""> Select user</option>

        {
          users.map(name => (
            <option value={name} key={name}>{name}</option>
          ))
        }

      </select>

      {
        error && <div className="form__error">Please choose a user</div>
      }
    </>
  );
};

Select.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.bool.isRequired,
};
