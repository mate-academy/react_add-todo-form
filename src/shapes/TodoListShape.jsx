import PropTypes from 'prop-types';

export const TodoListShape = PropTypes.arrayOf(
  PropTypes.objectOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
    userId: PropTypes.number.isRequired,
  })),
).isRequired;
