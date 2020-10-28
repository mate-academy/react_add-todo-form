import PropTypes from 'prop-types';
import { TodoShape } from '../Todo/TodoShape';

export const TodoListShape = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};
