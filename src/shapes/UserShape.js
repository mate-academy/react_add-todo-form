import PropTypes from 'prop-types';

export const UserShape = {
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  id: PropTypes.number.isRequired,
};
