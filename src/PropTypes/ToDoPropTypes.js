import PropTypes from 'prop-types';
import { UserPropTypes } from './UserPropTypes';

export const ToDoPropTypes = {
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape(UserPropTypes).isRequired,
};
