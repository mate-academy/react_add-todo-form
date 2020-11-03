import PropTypes from 'prop-types';
import { OptionShape } from './OptionShape';

export const SelectShape = {
  selectedUser: PropTypes.string.isRequired,
  preparedUsers: OptionShape,
  errorOnSelect: PropTypes.bool.isRequired,
  handleChangeOnSelect: PropTypes.func.isRequired,
};
