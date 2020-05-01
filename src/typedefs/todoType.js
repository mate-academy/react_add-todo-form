import PropTypes from 'prop-types';

export const TodoType = PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
});
