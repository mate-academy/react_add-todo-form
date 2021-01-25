import PropTypes from 'prop-types';

export const SelectUserShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
}).isRequired;
