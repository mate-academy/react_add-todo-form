import PropTypes from 'prop-types';

const GeoTypes = PropTypes.shape({
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
});

const CompanyTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  catchPhrase: PropTypes.string.isRequired,
  bs: PropTypes.string.isRequired,
});

const AddressTypes = PropTypes.shape({
  street: PropTypes.string.isRequired,
  suite: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  geo: GeoTypes,
});

export const UserTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: AddressTypes,
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  company: CompanyTypes,
});

export const TasksTypes = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const NewTodoTypes = PropTypes.shape({
  users: PropTypes.arrayOf(
    UserTypes,
  ).isRequired,
  title: PropTypes.string.isRequired,
  getTitleOfTask: PropTypes.func.isRequired,
  getUserId: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
});
