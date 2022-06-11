import React from 'react';
import { PreparedTodos } from '../../react-app-env';
import './TodoList.scss';

interface Prop {
  todosPrepared: PreparedTodos[]
}

export const TodoList:React.FC<Prop> = ({ todosPrepared }) => (
  <div className="todoBox">
    {todosPrepared.map(todo => (
      <div className="todoBox__todo" key={todo.id}>
        {todo.user && (
          <>
            <h3>
              <strong>Name:</strong>
              {todo.user.name}
              {todo.user.username}
            </h3>

            <p>
              <strong>Title:</strong>
              {todo.title}
            </p>
            <p>
              <strong>Status:</strong>
              {todo.completed ? 'Complated' : 'Not complated'}
            </p>
          </>
        )}
      </div>
    ))}
  </div>
);
