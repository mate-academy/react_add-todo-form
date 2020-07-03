import React from 'react';
import PropTypes from 'prop-types';

export const AddUser = ({ id, name }) => {

  return (
    <option
      value={id}
    >
      {name}
    </option>
  );
};

// AddUser.propTypes = {
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
// };
