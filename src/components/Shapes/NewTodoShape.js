import PropTypes from 'prop-types';

export const NewTodoShape = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      label: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  className: PropTypes.string,
});
