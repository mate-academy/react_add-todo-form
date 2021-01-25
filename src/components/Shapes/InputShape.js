import PropTypes from 'prop-types';

export const InputShape = {
  value: PropTypes.string.isRequired,
  titleError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
