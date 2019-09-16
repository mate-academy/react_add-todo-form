import PropTypes from 'prop-types';

const UserShape = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const TodoShape = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(UserShape).isRequired,
};

export const UserTypes = PropTypes.objectOf(UserShape).isRequired;

export const TodoTypes = PropTypes.objectOf(TodoShape).isRequired;

export const TodoListTypes = {
  listOfTodo: PropTypes.arrayOf(PropTypes.objectOf(TodoShape)).isRequired,
};
