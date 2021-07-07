import PropTypes from 'prop-types';

export const InputShape = PropTypes.shape({
  callback: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
});
