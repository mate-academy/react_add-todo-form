import PropTypes from 'prop-types';

export const SelectShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  errorSelect: PropTypes.string.isRequired,
}).isRequired;
