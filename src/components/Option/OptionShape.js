import PropTypes from 'prop-types';
import { UserShape } from '../User/UserShape';

export const OptionShape = PropTypes.shape({
  users: UserShape,
});
