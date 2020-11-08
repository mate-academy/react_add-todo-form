import PropTypes from 'prop-types';
import { TodoTypes } from '../Todo/TodoTypes';

export const TodoListTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(TodoTypes)).isRequired,
};
