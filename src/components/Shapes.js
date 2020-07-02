import PropTypes from 'prop-types';

export const ShapeUser = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    suite: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
    geo: PropTypes.shape({
      lat: PropTypes.string.isRequired,
      lng: PropTypes.string.isRequired,
    }),
  }),
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    catchPhrase: PropTypes.string.isRequired,
    bs: PropTypes.string.isRequired,
  }),
});

export const ShapeTodo = {
  todo: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: ShapeUser,
  }).isRequired,
};

export const ShapeNewTodo = {
  onImputChange: PropTypes.func.isRequired,
  onTodoAdd: PropTypes.func.isRequired,
  onUserAdd: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  errorUser: PropTypes.string.isRequired,
};
