import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  name: PropTypes.string,
}).isRequired;

export const UserProps = {
  user: userShape,
};

export const TodoItemProps = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: userShape,
  }).isRequired,
};

export const TodoListProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.number,
      user: userShape,
    }).isRequired,
  ).isRequired,
};

export const NewTodoProps = {
  value: PropTypes.string,
}.isRequired;
