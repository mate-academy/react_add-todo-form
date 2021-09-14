import React from 'react';
import './TodoItem.scss';

type Props = {
  todo: Todos;
  email: string;
  name: string;
};

export const TodoItem:React.FC<Props> = (props) => {
  const { todo, email, name } = props;

  return (
    <div className="TodoItem">
      <p className="TodoItem__Name">
        {name}
      </p>
      <p className="TodoItem__Email">
        {email}
      </p>
      <p className="TodoItem__taskName">
        {todo.title}
      </p>
      <p className="TodoItem__Status">
        {todo.completed ? 'Completed' : 'In progress'}
      </p>
    </div>
  );
};
