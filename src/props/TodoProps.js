import PropTypes from 'prop-types';
import { UserProps } from './UserProps';

export const TodoProps = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape(UserProps).isRequired,
};
