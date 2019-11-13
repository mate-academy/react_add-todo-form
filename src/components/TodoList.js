import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList(props) {
  return (
    <table>
      <thead>
        <tr>
          <td>Title</td>
          <td>
            User Name
          </td>
          <td>
            IS Completed ?
          </td>
        </tr>
      </thead>
      <tbody>
        <>
          {
            props.todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          }
        </>

      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos: PropTypes.instanceOf(Array).isRequired,
};

export default TodoList;
