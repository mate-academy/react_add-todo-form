import PropTypes from 'prop-types';

export const typeUser = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

export const typeTodo = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  compleeted: PropTypes.bool,
  user: typeUser,
});
