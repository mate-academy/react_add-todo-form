import PropTypes from 'prop-types';

export const UserPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}).isRequired;
