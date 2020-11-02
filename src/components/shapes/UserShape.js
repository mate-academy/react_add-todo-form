import PropTypes from 'prop-types';

export const UserShape = PropTypes.shape({
  user: PropTypes.string.isRequired,
}).isRequired;
