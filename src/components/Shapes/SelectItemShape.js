import PropTypes from 'prop-types';
import { UserShape } from './UserShape';

export const SelectItemShape = {
  users: PropTypes.arrayOf(
    PropTypes.shape(UserShape).isRequired,
  ).isRequired,
};
