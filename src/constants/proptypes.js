import PropTypes from 'prop-types';

const UserObject = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};

const TodoObject = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape(UserObject).isRequired,
  completed: PropTypes.bool.isRequired,
};

export const TodoListPropTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(TodoObject)).isRequired,
};

export const TodoItemPropTypes = {
  todo: PropTypes.shape(TodoObject).isRequired,
};

export const UserPropTypes = {
  user: PropTypes.shape(UserObject).isRequired,
};

export const NewTodoPropTypes = {
  onAdd: PropTypes.func.isRequired,
};
