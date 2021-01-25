import PropTypes from 'prop-types';
import { SelectItemShape } from './SelectItemShape';

export const SelectShape = {
  value: PropTypes.string.isRequired,
  usernameError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape(SelectItemShape).isRequired,
  ).isRequired,
};
