/* eslint-disable max-len, no-console */
import React, { useContext, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoForm } from './TodoForm';
import { TodoUpdateContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const [editing, setEditing] = useState(false);
  const { updateTodo, deleteTodo } = useContext(TodoUpdateContext);

  return (
    <article key={todo.id} className="TodoCard">
      {editing ? (
        <TodoForm
          onSubmit={(updatedTodo: Todo) => {
            return updateTodo(updatedTodo)
              .then(() => setEditing(false));
          }}
          onReset={() => setEditing(false)}
          todo={todo}
        />
      ) : (
        <p className="TodoCard__title">
          {todo.title}

          <button type="button" onClick={() => deleteTodo(todo.id)}>
            x
          </button>

          <button type="button" onClick={() => setEditing(true)}>
            edit
          </button>
        </p>
      )}
    </article>
  );
});
