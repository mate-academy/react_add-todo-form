import PropTypes from 'prop-types';
import { UserShape } from './UserShape';

export const TodoShape = {
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape(UserShape).isRequired,
};
