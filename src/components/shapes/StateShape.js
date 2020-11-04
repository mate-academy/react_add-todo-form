import PropTypes from 'prop-types';

export const StateShape = {
  selectedUserId: PropTypes.number.isRequired,
  inputText: PropTypes.string.isRequired,
  selectWarnMessage: PropTypes.string.isRequired,
  inputWarnMessage: PropTypes.string.isRequired,
};
