import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import NewToDo from '../NewToDo/NewToDo';

const TodoList = ({ users, addNewTodo, todos }) => (
  <>
    <NewToDo
      users={users}
      addNewTodo={addNewTodo}
    />
    <ul className="list-group">
      {todos.map(item => <TodoItem todo={item} key={item.id} />)}
    </ul>
  </>
);

const userShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
});

const todoShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: userShape.isRequired,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(todoShape).isRequired,
  users: PropTypes.arrayOf(userShape).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};

export default TodoList;
