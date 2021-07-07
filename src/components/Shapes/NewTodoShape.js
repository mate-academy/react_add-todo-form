import PropTypes from 'prop-types';

export const NewTodoShape = PropTypes.shape({
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
});
