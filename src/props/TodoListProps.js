import PropTypes from 'prop-types';
import { TodoProps } from './TodoProps';

export const TodoListProps = {
  todos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ...TodoProps,
  }),
};
