import React from 'react';
import PropTypes from 'prop-types';

export const Option = (props) => {
  const { data, id } = props;

  return (
    <option value={id}>{data}</option>
  );
};

Option.propTypes = {
  data: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
