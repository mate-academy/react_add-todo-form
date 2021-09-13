import React from 'react';

import './TodoList.scss';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <div className="container">
      {todos.map((todo: Todo) => (
        <>
          <div className="row Todo" key={todo.userId}>
            ID:
            <div className="col Todo__id">{todo.id && todo.id}</div>
            Todo:
            <div className="col Todo__title">{todo.title}</div>
            User:
            <div className="col Todo__username">{todo.user && todo.user.name}</div>
            Email:
            <div className="col Todo__usermail">{todo.user && todo.user.email}</div>
          </div>
        </>
      ))}
    </div>
  );
};
