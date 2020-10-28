import PropTypes from 'prop-types';
import { UserShape } from './UserShape';

export const TodoListShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: UserShape.isRequired,
}).isRequired;
