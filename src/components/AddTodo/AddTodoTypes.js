import PropTypes from 'prop-types';
import { UserTypes } from '../User/UserTypes';

export const AddTodoTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(UserTypes)).isRequired,
  addTodo: PropTypes.func.isRequired,
};
