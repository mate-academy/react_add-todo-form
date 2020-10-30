import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const AddPerson = ({ todos }) => (
  <>
    {
      todos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))
    }
  </>
);

AddPerson.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

export default AddPerson;
