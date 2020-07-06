import PropTypes from 'prop-types';

export const TodoShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
});

export const TodosShape = PropTypes.arrayOf(TodoShape);

export const NameShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
});

export const NamesShape = PropTypes.arrayOf(NameShape);
