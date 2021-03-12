import PropTypes from 'prop-types';

export const TodoListShape = {
  todolist: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}.isRequired;
