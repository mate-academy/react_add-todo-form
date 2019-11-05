import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todoItem/TodoItem';

const TodoList = ({ todo }) => (
  <div>
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Унікальний номер</th>
          <th>Завдання</th>
          <th>Відповідальний</th>
        </tr>
      </thead>
      <tbody>
        {todo.map(item => (
          <TodoItem
            key={item.id}
            executor={item.executor}
            title={item.title}
            id={item.id}
          />
        ))}
      </tbody>
    </table>
  </div>
);

TodoList.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
