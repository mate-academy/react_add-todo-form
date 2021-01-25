import PropTypes from 'prop-types';
import { UserShape } from './UserShape';

export const TodoShape = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape(UserShape),
}).isRequired;
