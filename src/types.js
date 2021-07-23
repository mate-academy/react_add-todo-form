import PropTypes from 'prop-types';

export const TodoShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const UsersShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}).isRequired;

export const TodoFormShape = {
  taskNameMaxLength: PropTypes.number.isRequired,
  newTaskName: PropTypes.string.isRequired,
  inputAction: PropTypes.func.isRequired,
  showInputError: PropTypes.bool.isRequired,
  selectedUser: PropTypes.string.isRequired,
  selectAction: PropTypes.func.isRequired,
  showSelectError: PropTypes.bool.isRequired,
  addButtonAction: PropTypes.func.isRequired,
};
