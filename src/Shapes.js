import PropTypes from 'prop-types';

const TodoShape = PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.any,
  title: PropTypes.string,
});

export default TodoShape;
