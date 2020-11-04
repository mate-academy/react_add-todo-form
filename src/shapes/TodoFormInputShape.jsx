import PropTypes from 'prop-types';

export const TodoFormInputShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  handleChage: PropTypes.func.isRequired,
  errorText: PropTypes.string.isRequired,
}).isRequired;
