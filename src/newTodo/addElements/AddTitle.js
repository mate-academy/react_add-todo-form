import React from 'react';
import PropTypes from 'prop-types';

export const AddTitle = ({ giveName }) => {

  return (
    <input
      required
      maxLength={100}
      type="text"
      onChange={event => giveName(event.target.value)}
    />
  );
};

// AddTitle.propTypes = {
//   title: PropTypes.string.isRequired,
//   giveName: PropTypes.func.isRequired,
// };
