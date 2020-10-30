import PropTypes from 'prop-types';
import { TodoShape } from './TodoShape';

export const TodoListShape = {
  tasks: PropTypes.arrayOf(TodoShape).isRequired,
};
