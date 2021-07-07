import PropTypes from 'prop-types';

export const TodosListShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
});
