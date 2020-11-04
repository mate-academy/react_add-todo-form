import PropTypes from 'prop-types';

export const TodoShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}).isRequired;
