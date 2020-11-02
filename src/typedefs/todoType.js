import PropTypes from 'prop-types';
import { userType } from './userType';

export const todoType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: userType,
});
