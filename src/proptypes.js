import PropTypes from 'prop-types';

export const todosProps = {
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export const usersProps = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
