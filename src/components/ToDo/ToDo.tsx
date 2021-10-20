import React from 'react';

import './ToDo.scss';

import ToDoItem from '../../types/ToDoItem';

type Props = {
  todo: ToDoItem,
};

const ToDo:React.FC<Props> = ({ todo }) => {
  return (
    <div className="ToDoItem">
      <div className="ToDoItem__name">
        {todo?.user?.name}
        @
        {todo?.user?.username}
      </div>
      <div className="ToDoItem__title">
        {todo.title}
      </div>
      <div className="ToDoItem__is-done">
        Status:
        {todo.completed
          ? ' Done'
          : ' Not completed'}
      </div>
    </div>
  );
};

export default ToDo;
