import PropTypes from 'prop-types';
import { UserPropTypes } from './UserPropTypes';

export const TodoPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  user: UserPropTypes,
}).isRequired;
