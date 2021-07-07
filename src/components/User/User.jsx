import PropTypes from 'prop-types';

export const User = ({ user }) => user.name;

User.propTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
}).isRequired;
