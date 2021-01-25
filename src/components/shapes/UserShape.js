import PropTypes from 'prop-types';

export const UserShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});
