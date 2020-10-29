import PropTypes from 'prop-types';
import { UserProps } from './UserProps';

export const FormProps = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      ...UserProps,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
