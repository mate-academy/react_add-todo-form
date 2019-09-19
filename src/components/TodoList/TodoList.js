import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import TableTodo from '../TableTodo/TableTodo';
import FormTodo from '../FormTodo/FormTodo';
import './TodoList.css';

const TodoList = ({ todos, users, addTodo }) => (
  <>
    <div className="todolist">
      <Header />
      <TableTodo users={users} todos={todos} />
      <FormTodo users={users} todos={todos} addTodo={addTodo} />
    </div>
  </>
);

TodoList.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TodoList;
