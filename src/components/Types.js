import PropTypes from 'prop-types';

export const UserType = {
  name: PropTypes.string.isRequired,
};

export const TodoType = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape(
    UserType,
  ).isRequired,
};
