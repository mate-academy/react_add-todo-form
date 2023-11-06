import React, { useContext, useState } from 'react';
import { GoodForm } from '../GoodForm';
import { GoodsOperationsContext } from '../GoodsProvider';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const ProductCard: React.FC<Props> = ({
  todo,
}) => {
  const [editing, setEditing] = useState(false);

  const { deleteGoodHandler } = useContext(GoodsOperationsContext);

  return (
    <div style={{ display: 'flex' }}>
      <button
        type="button"
        onClick={() => {
          setEditing(true);
        }}
      >
        Edit
      </button>
      {editing ? (
        <GoodForm
          todo={todo}
          setEditing={setEditing}
        />
      ) : (
        <article
          className="GoodCard"
          style={{ marginBottom: '8px' }}
        >
          <span
            className="GoodCard__title"
          >
            {todo.title}
          </span>
          <button
            type="button"
            onClick={() => {
              deleteGoodHandler(todo.id);
            }}
          >
            X
          </button>
        </article>
      )}
    </div>
  );
};
