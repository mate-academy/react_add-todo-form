import React from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map((todo) => (
        <li key={todo.id} className="box">
          <div className="field is-grouped is-grouped-multiline">
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-dark">user</span>
                <span className="tag is-info">{todo.userId}</span>
              </div>
            </div>
            <span className="todo-title">{todo.title}</span>
            {todo.completed
              ? <span className="tag is-success is-light">completed</span>
              : <span className="tag is-danger is-light">not completed</span>}
          </div>
        </li>
      ))}
    </ul>
  );
};
