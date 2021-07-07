import PropTypes from 'prop-types';
import { ShapeUser } from './ShapeUser';

export const ShapeTodo = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: ShapeUser,
});
