import PropTypes from 'prop-types';

export const UserProps = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    website: PropTypes.string,
    phone: PropTypes.number,
    email: PropTypes.string,
  }).isRequired,
};

const todoListShape = PropTypes.shape({
  userid: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
});

export const TodoListProps = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoListShape)).isRequired,
};

const userShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  adress: PropTypes.shape({
    street: PropTypes.string,
    suite: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.string,
    geo: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
    }),
  }),
  compane: PropTypes.shape({
    name: PropTypes.string,
    catchPhrase: PropTypes.string,
    bs: PropTypes.string,
  }),
});

export const TodoItemProps = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.shape(userShape),
  }).isRequired,
};
