import PropTypes from 'prop-types';

export const FormPropTypes = {
  onInputChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  checkedLengthWord: PropTypes.bool.isRequired,
  isChoosen: PropTypes.bool.isRequired,
  titleLength: PropTypes.number.isRequired,
};
