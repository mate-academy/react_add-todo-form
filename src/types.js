import PropTypes from 'prop-types';

export const TypeTodo = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
});
