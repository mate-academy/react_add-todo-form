import PropTypes from 'prop-types';

const geoShape = PropTypes.shape({
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
});

const addressShape = PropTypes.shape({
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  suite: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  address: geoShape,
});

const companyShape = PropTypes.shape({
  bs: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  catchPhrase: PropTypes.string.isRequired,
});

export const userShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  company: companyShape,
  address: addressShape,
});

export const todoShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  user: userShape,
});

export const formShape = PropTypes.shape({
  todosTitle: PropTypes.func.isRequired,
  saveTodos: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  user: userShape,
});

export const listShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  user: userShape,
});

export const newTodoShape = PropTypes.shape({
  addToList: PropTypes.func.isRequired,
  user: userShape,
  list: listShape,
});
