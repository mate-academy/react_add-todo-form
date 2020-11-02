import PropTypes from 'prop-types';

export const UserShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
}).isRequired;
