import PropTypes from 'prop-types';

export const SelectShape = {
  value: PropTypes.string.isRequired,
  usernameError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
