import PropTypes from 'prop-types';

export const CompanyShapes = PropTypes.shape({
  name: PropTypes.string,
  catchPhrase: PropTypes.string,
  bs: PropTypes.string,
});

export const UserGeo = PropTypes.shape({
  lat: PropTypes.string,
  lng: PropTypes.string,
});

export const UserAdressShape = PropTypes.shape({
  street: PropTypes.string,
  suite: PropTypes.string,
  city: PropTypes.string,
  zipcode: PropTypes.string,
  geo: PropTypes.shape({
    UserGeo,
  }),
});

export const UserShapes = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  adress: UserAdressShape,
  phone: PropTypes.string,
  website: PropTypes.string,
  company: CompanyShapes,
});

export const TodoShapes = PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
});

export const PreparedTodosShape = PropTypes.shape({
  TodoShapes,
  user: UserShapes,
});

export const ButtonShapes = PropTypes.shape({
  buttonName: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
});

export const SelectionShapes = PropTypes.shape({
  flag: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserShapes).isRequired,
});

export const TaskInputShapes = PropTypes.shape({
  flag: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  emtyInput: PropTypes.string.isRequired,
});
