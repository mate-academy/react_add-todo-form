import React from 'react';
import PropTypes from 'prop-types';

export const AddTitle = ({ todosTitle }) => (
  <input
    required
    maxLength={40}
    type="text"
    onChange={event => todosTitle(event.target.value)}
  />
);

AddTitle.propTypes = {
  todosTitle: PropTypes.func.isRequired,
};
