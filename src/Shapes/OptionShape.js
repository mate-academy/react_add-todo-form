import PropTypes from 'prop-types';

export const OptionShape = PropTypes.arrayOf(
  PropTypes.string.isRequired,
).isRequired;
