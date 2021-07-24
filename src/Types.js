import propTypes from 'prop-types';

export const TodoType = {
  userId: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  completed: propTypes.bool.isRequired,
};

export const UserType = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  todos: propTypes.arrayOf(propTypes.shape(TodoType)).isRequired,
};
