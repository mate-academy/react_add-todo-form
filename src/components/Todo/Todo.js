import React from 'react';
import TodoShape from '../../Shapes';

const Todo = (props) => {
  const { title, name, id } = props;

  return (
    <li className="item">
      <h2 className="item__title">{title}</h2>
      <p className="item__name">{name}</p>
      <span>
        {`Todo ID ${id}`}
      </span>
    </li>
  );
};

Todo.propTypes = TodoShape.isRequired;

export default Todo;
