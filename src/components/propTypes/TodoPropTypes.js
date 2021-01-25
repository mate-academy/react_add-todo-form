import PropTypes from 'prop-types';
import { UserPropTypes } from './UserPropTypes';

export const TodoPropTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.shape(UserPropTypes).isRequired,
};
