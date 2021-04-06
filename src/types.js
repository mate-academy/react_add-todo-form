import PropTypes from 'prop-types';

export const TypeUser = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export const TypeTodo = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape(TypeUser).isRequired,
};

export const TypeTodoList = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      ...TypeTodo,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
