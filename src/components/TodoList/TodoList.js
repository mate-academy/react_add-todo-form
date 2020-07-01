import React from 'react';
import PropTypes from 'prop-types';
import { TodoShape } from '../../Shapes';
import './TodoList.css';
import { Todo } from '../Todo/Todo';

export const TodoList = (props) => {
  const { list } = props;

  return (
    <ul className="list">
      {list.map(item => (
        <Todo
          key={item.id}
          title={item.title}
          completed={item.completed}
          name={item.user.name}
          id={item.id}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  list: PropTypes.arrayOf(TodoShape).isRequired,
};
