import React from 'react';
import PropTypes from 'prop-types';
import TodoShape from '../../Shapes';
import Todo from '../Todo/Todo';

const TodoList = (props) => {
  const { todos } = props;

  return (
    <ul className="list">
      {todos.map(item => (
        <Todo
          id={item.id}
          key={item.id}
          title={item.title}
          name={item.user.name}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};

export default TodoList;
