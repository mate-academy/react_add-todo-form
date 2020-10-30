import PropTypes from 'prop-types';

export const TodoShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
}).isRequired;
