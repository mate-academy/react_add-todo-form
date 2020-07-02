import PropTypes from 'prop-types';
import { ShapeUser } from './ShapeUser';

export const ShapeNewTodoDefault = {
  errorMessage: '',
};

export const ShapeNewTodo = PropTypes.shape({
  users: PropTypes.arrayOf(ShapeUser).isRequired,
  onChangeUser: PropTypes.func.isRequired,
  onChangeNewTodo: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  wrongInput: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  currentTitle: PropTypes.string.isRequired,
});
