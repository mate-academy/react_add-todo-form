import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
// import { TodoForm } from "../TodoForm";

type Props = {
  todo: Todo;
  onTodoDeleted: (todoID: number) => void,
  // onTodoUpdate: (todo: Todo) => void,
};

export const TodoInfo: React.FC<Props> = ({ todo, onTodoDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      {isEditing && <p> Form </p> }

      <h2 className="TodoInfo__title">
        {todo.title}

        <button type="button" onClick={() => onTodoDeleted(todo.id)}>
          x
        </button>

        <button type="button" onClick={() => setIsEditing(true)}>
          edit
        </button>
      </h2>

      {todo.user && (
        <UserInfo user={todo.user}/>
      )}
    </article>
  );
}
