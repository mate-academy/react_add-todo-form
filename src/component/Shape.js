import PropTypes from 'prop-types';

export const TodoListShape = PropTypes.shape({
  toggle: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
});

export const SelectShape = PropTypes.shape({
  userName: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.func.isRequired,
});
