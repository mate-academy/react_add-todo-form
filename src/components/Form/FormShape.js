import PropTypes from 'prop-types';
import { UserShape } from '../User/UserShape';

export const FormShape = PropTypes.shape({
  addTodo: PropTypes.func.isRequired,
  users: UserShape,
});
