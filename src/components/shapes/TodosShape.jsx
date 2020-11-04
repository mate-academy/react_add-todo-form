import PropTypes from 'prop-types';
import { UsersShape } from './UsersShape';

export const TodosShape = {
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape(UsersShape).isRequired,
};
