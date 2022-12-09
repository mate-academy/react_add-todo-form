import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoForm } from '../TodoForm';
import { UserInfo } from '../UserInfo';
import { useAuthContext } from '../Auth/AuthContext';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
  onDelete: () => Promise<void>;
  onUpdate: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  onDelete,
  onUpdate,
}) => {
  const [editing, setEditing] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const authUser = useAuthContext();

  const handleDelete = async () => {
    setDeleteLoader(true);

    await onDelete();

    setDeleteLoader(false);
  };

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

          <div className="bottomInfo">
            {authUser && <UserInfo user={authUser} />}

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteLoader}
            >
              x
            </button>

            <button type="button" onClick={() => setEditing(true)}>
              edit
            </button>
          </div>
        </>
      )}
    </article>
  );
};
