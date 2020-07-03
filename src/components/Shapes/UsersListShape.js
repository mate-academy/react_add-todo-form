import PropTypes from 'prop-types';

export const UsersListShape = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}));
