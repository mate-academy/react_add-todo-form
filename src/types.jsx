import PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

export const TodoType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  user: PropTypes.shape(UserType).isRequired,
});

export const TodoListType = {
  todos: PropTypes.arrayOf(TodoType),
};

export const TodoFormType = {
  users: PropTypes.arrayOf(UserType).isRequired,
  addTodo: PropTypes.func.isRequired,
};
