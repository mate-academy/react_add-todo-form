import PropTypes from 'prop-types';

export const TodosListShape = PropTypes.arrayOf(PropTypes.shape({
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
}));
