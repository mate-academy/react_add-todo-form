import PropTypes from 'prop-types';

export const TodoShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const TodosShape = PropTypes.arrayOf(TodoShape);

export const NameShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
});

export const NamesShape = PropTypes.arrayOf(NameShape);

export const ValueShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);
