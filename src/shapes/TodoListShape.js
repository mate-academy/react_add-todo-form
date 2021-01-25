import PropTypes from 'prop-types';
import { TodoShape } from './TodoShape';

export const TodoListShape = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};
