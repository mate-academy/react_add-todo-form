import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import TableTodo from '../TableTodo/TableTodo';
import FormTodo from '../FormTodo/FormTodo';
import './TodoList.css';

const TodoList = ({
  todos,
  users,
  handleInput,
  handleClick,
  handleSelect,
  userSelect,
  todoTitle,
  userError,
  selectError,
}) => (
  <>
    <div className="todolist">
      <Header />
      <TableTodo users={users} todos={todos} />
      <FormTodo
        users={users}
        handleInput={handleInput}
        handleClick={handleClick}
        handleSelect={handleSelect}
        userSelect={userSelect}
        todoTitle={todoTitle}
        userError={userError}
        selectError={selectError}
      />
    </div>
  </>
);

TodoList.propTypes = {
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
  handleInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  userSelect: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  userError: PropTypes.string.isRequired,
  selectError: PropTypes.string.isRequired,
};

export default TodoList;
