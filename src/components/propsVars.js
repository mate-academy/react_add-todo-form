import PropTypes from 'prop-types';

export const usersProps = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}).isRequired);

export const userShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
});

export const todos = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: userShape.isRequired,
}));
