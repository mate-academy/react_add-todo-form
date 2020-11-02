import PropTypes from 'prop-types';
import { userShape } from './userShape';

export const todoShape = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: userShape,
});
