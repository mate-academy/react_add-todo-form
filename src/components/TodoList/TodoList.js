import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import NewToDo from '../NewToDo/NewToDo';

const TodoList = props => (
  <>
    <NewToDo
      users={props.users}
      addNewTodo={props.addNewTodo}
    />
    <ul className="list-group">
      {props.todos.map(item => <TodoItem todo={item} key={item.id} />)}
    </ul>
  </>
);

const usershape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
});

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(shape).isRequired,
  users: PropTypes.arrayOf(usershape).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};

export default TodoList;
