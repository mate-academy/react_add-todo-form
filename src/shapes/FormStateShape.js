import PropTypes from 'prop-types';

export const StateShape = PropTypes.shape({
  userName: PropTypes.string.isRequired,
  userNameError: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  titleError: PropTypes.bool.isRequired,
}).isRequired;
