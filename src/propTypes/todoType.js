import PropTypes from 'prop-types';

import { userType } from './userType';

export const todoType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: userType.isRequired,
});
