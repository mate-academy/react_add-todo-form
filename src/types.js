import PropTypes from 'prop-types';

export const TypeTodoList = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export const TypeTodoItem = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export const TypeUser = {
  name: PropTypes.string.isRequired,
};
