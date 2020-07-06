import PropTypes from 'prop-types';

export const ShapeOption = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
});

export const ShapeSelect = PropTypes.shape({
  users: PropTypes.arrayOf(ShapeOption).isRequired,
  selected: PropTypes.string.isRequired,
});

export const ShapeTodoItem = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
});

export const ShapeTodosList = PropTypes.shape({
  todos: PropTypes.arrayOf(ShapeTodoItem).isRequired,
  flag: PropTypes.func.isRequired,
});

export const ShapeNewTodo = PropTypes.shape({
  usersNames: PropTypes.arrayOf(ShapeOption).isRequired,
  addTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
});
