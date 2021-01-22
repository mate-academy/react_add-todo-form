import React from 'react';
import { TodoType } from '../../types';
import './todo.css';

export function ToDo({ item }) {
  return (
    <p className="single-todo" key={item.id}>
      <span>{item.title}</span>
      <span>
        User id:
        {item.userId}
      </span>
    </p>
  );
}

ToDo.propTypes = {
  item: TodoType,
};

ToDo.defaultProps = {
  item: {},
};
