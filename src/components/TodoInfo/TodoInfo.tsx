import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoForm } from '../TodoForm';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => void;
  onUpdate: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({ todo, onDelete, onUpdate }) => {
    const [editing, setEditing] = useState(false);

    console.log(`Rendering ${todo.id}`);
    useEffect(() => console.log(`${todo.id} todo changed`), [todo]);
    useEffect(() => console.log(`${todo.id} onDelete changed`), [onDelete]);
    useEffect(() => console.log(`${todo.id} onUpdate changed`), [onUpdate]);

    return (
      <article
        data-id={todo.id}
        className={classNames('TodoInfo', {
          'TodoInfo--completed': todo.completed,
        })}
      >
        {editing ? (
          <TodoForm
            todo={todo}
            onSubmit={todoData => {
              onUpdate({ id: todo.id, ...todoData });
              setEditing(false);
            }}
          />
        ) : (
          <>
            <h2 className="TodoInfo__title">{todo.title}</h2>

            {todo.user && (
              <UserInfo user={todo.user} />
            )}

            <button type="button" onClick={() => onDelete(todo.id)}>
              x
            </button>

            <button type="button" onClick={() => setEditing(true)}>
              edit
            </button>
          </>
        )}
      </article>
    );
  },
);
