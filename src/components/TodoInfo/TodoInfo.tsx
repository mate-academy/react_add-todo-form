import React from 'react';
import style from './TodoInfo.module.css';
import { Todo } from '../../types/types';

type Props = {
  todo: Todo,
};

const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className={style.todoInfo}>
    <div className={style.todoTask}>
      <input type="checkbox" checked={todo.completed} />
      <span className={style.todoTitle}>
        {todo.title}
      </span>
    </div>
    <div className={style.todoAuthor}>
      {`UserID: ${todo.userId}`}
    </div>
  </div>
);

export default TodoInfo;
