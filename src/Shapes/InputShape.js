import PropTypes from 'prop-types';

export const InputShape = {
  enteredTodo: PropTypes.string.isRequired,
  errorOnInput: PropTypes.bool.isRequired,
  handleChangeOnInput: PropTypes.func.isRequired,
};
