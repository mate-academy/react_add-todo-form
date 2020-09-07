import PropTypes from 'prop-types';

export const TodoListShape = PropTypes.shape({
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
});

export const SelectShape = PropTypes.shape({
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
});
