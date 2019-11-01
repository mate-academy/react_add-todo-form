import React from 'react';
import PropTypes from 'prop-types';
import TodoRows from './todoRow';

const TodoList = ({ todos }) => (
  <>
    <table className="ui red table">
      <thead>
        <tr>
          <th>TODO item</th>
          <th>The name of the user</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <TodoRows todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
