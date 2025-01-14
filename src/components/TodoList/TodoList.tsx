import React from 'react';
import { TodoInfo } from '../TodoInfo';

import classNames from 'classnames';
import { Props } from './Props';
export const TodoList: React.FC<Props> = React.memo(function TodoList({
  todos,
  selectedTodoId,
  onDelete = () => {},
  onSelect = () => {},
}) {
  return (
    <React.Fragment>
      <section className="TodoList">
        <table className="table is-striped is-narrow box">
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Title</th>
              <th>User</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {todos?.map(todo => (
              <tr
                key={todo.id}
                data-id={todo.id}
                className={classNames({
                  'has-background-info': selectedTodoId === todo.id,
                })}
              >
                <td>{todo.id}</td>

                <TodoInfo todo={todo} />

                <td>
                  <button
                    className="icon button is-inverted is-info"
                    onClick={() => onSelect(todo)}
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="icon button is-inverted is-danger"
                    onClick={() => onDelete(todo.id)}
                  >
                    <i className="fas fa-xmark"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
});
