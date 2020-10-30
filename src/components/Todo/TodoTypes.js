import PropTypes from 'prop-types';
import { UserTypes } from '../User/UserTypes';

export const TodoTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.shape(UserTypes),
};
