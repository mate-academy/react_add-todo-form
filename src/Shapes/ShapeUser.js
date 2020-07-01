import PropTypes from 'prop-types';

const ShapeGeo = PropTypes.shape({
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
});

const ShapeAddress = PropTypes.shape({
  street: PropTypes.string.isRequired,
  suite: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  geo: ShapeGeo,
});

const ShapeCompany = PropTypes.shape({
  name: PropTypes.string.isRequired,
  catchPhrase: PropTypes.string.isRequired,
  bs: PropTypes.string.isRequired,
});

export const ShapeUser = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: ShapeAddress,
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  company: ShapeCompany,
});
