import PropTypes from 'prop-types';

export const TodoType = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  completed: PropTypes.bool.isRequired,
};

export const TodoListType = {
  todos: PropTypes.arrayOf(PropTypes.shape(TodoType)).isRequired,
};

export const UserType = {
  cuerrentUser: PropTypes.string,
};
