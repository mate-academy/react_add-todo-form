import PropTypes from 'prop-types';

export const OptionShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});
