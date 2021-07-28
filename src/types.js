import PropTypes from 'prop-types';

export const TodoType = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

export const AddressType = PropTypes.shape({
  street: PropTypes.string.isRequired,
  suite: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  geo: PropTypes.shape({
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
  }),
});

export const CompanyType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  catchPhrase: PropTypes.string.isRequired,
  bs: PropTypes.string.isRequired,
});

export const UserType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string,
  email: PropTypes.email,
  address: AddressType,
  phone: PropTypes.string,
  website: PropTypes.string,
  company: CompanyType,
});
