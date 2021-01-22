import PropTypes from 'prop-types';

export const todosValidation = PropTypes.arrayOf(PropTypes.shape({
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
}).isRequired);
