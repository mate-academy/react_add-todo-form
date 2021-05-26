import PropTypes from 'prop-types';

const CompanyType = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

export const UserType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  company: CompanyType,
});
