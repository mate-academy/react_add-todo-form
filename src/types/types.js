import PropTypes from 'prop-types';

const {
  shape,
  string,
  func,
  bool,
  number,
  arrayOf,
} = PropTypes;

export const todosTypes = arrayOf(shape({
  userId: number,
  id: number,
  title: string,
  completed: bool,
  length: number,
}));

export const usersType = shape({
  id: string,
  name: string,
  username: string,
  email: string,
  map: func,
});

export const allTodos = PropTypes.arrayOf(
  PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  })
);

export const addNewTodoType = func;
