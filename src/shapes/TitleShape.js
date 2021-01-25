import PropTypes from 'prop-types';

export const TitleShape = {
  value: PropTypes.string.isRequired,
  titleError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
