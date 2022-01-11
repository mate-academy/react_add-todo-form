import React from 'react';
import { Todo } from '../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  onRemove: (id: number) => void;
  checkBoxChange: (event: {
    target: {
      id: string;
      type: string;
      checked: boolean;
    };
  }) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onRemove,
  checkBoxChange,
}) => (
  <ul className="todos">
    {todos.map(todo => (
      <li className="todos__todo" key={todo.id}>
        <div className="todos__todo-item">
          <input
            type="checkbox"
            id={todo.id.toString()}
            name="isTodoCompleted"
            checked={todo.completed}
            onChange={checkBoxChange}
            className="todos__todo-ckeckbox"
          />
          <div className="todos__todo-info">
            <h3 className="todos__todo-author">
              {todo.user && todo.user.name}
            </h3>
            <p className="todos__todo-title">
              {todo.title}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="app__button"
          onClick={() => onRemove(todo.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);
