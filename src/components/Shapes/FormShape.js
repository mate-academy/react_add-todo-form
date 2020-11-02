import PropTypes from 'prop-types';
import { UserShape } from './UserShape';

export const FormShape = {
  users: PropTypes.arrayOf(PropTypes.shape({
    ...UserShape,
    id: PropTypes.number.isRequired,
  })),
  addTodo: PropTypes.func.isRequired,
};
