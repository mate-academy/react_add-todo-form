import PropTypes from 'prop-types';

export const FormShape = {
  addTodo: PropTypes.func.isRequired,
  preparedUsers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
