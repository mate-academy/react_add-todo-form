import PropTypes from 'prop-types';

export const ShapeOption = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
});

export const ShapeSelect = PropTypes.shape({
  users: PropTypes.arrayOf(ShapeOption).isRequired,
  selected: PropTypes.string.isRequired,
});

export const ShapePrevious = PropTypes.shape({
  previous: PropTypes.func.isRequired,
});

export const ShapeTodoItem = PropTypes.shape({
  item: PropTypes.string.isRequired,
});

export const ShapeTodosList = PropTypes.shape({
  todos: PropTypes.arrayOf(ShapeTodoItem).isRequired,
});
