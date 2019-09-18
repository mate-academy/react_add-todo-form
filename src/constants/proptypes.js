import PropTypes from 'prop-types';

export const TodoListPropTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const TodoItemPropTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
};

export const UserPropTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};

export const NewTodoPropTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmitNewTodo: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  userValue: PropTypes.number.isRequired,
  isErrorTitle: PropTypes.bool.isRequired,
  isErrorUser: PropTypes.bool.isRequired,
};
