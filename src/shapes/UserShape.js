import PropTypes from 'prop-types';

export const UserShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  taskStatus: PropTypes.bool.isRequired,
}).isRequired;
