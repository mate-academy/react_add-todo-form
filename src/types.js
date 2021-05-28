import PropTypes from 'prop-types';

const allTypes = {

  addressType: PropTypes.shape({
    street: PropTypes.string.isRequired,
    suite: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
    geo: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  }),

};

allTypes.userType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: allTypes.addressType.isRequired,
});

allTypes.todoType = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: allTypes.userType.isRequired,
});

allTypes.AddTodoFormType = {
  users: allTypes.userType.isRequired,

  onAddToTheList: PropTypes.func.isRequired,
  onSaveInState: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,

  newTodoTitle: PropTypes.string.isRequired,
  newUserId: PropTypes.number.isRequired,
  hasTodoTitleError: PropTypes.bool.isRequired,
  hasUserIdError: PropTypes.bool.isRequired,
};

export default allTypes;
