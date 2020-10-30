import PropTypes from 'prop-types';

export const UserTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
