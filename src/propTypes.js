import PropTypes from 'prop-types';

export const typeTodo = {
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export const typeTodoList = {
  todos: PropTypes.arrayOf(PropTypes.shape(typeTodo)).isRequired,
};
