import PropTypes from 'prop-types';

const UserShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}).isRequired;

export default UserShape;
