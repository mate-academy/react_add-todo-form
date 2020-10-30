import PropTypes from 'prop-types';
import { TodoShape } from './TodoShape';

export const TodosListShape = PropTypes.arrayOf(TodoShape).isRequired;
