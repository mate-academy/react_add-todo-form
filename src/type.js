import PropTypes from 'prop-types';

const UserType = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

const TodoType = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: UserType.isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

export default TodoType;
