import PropTypes from 'prop-types';

export const SelectShape = PropTypes.shape({
  callback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
});
