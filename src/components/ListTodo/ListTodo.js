import React from 'react';
import PropTypes from 'prop-types';
import 'bulma';
import './ListTodo.scss';
import { Todo, todoTypes } from '../Todo/Todo';

export const ListTodo = ({ todos }) => (
  <>
    <table className="table is-hoverable">
      <thead className="thead">
        <tr className="tr tr-head">
          <th className="th">id</th>
          <th className="th">title</th>
          <th className="th">user</th>
          <th className="th">completed</th>
        </tr>
      </thead>

      <tbody className="tbody">
        {todos.map((todo, idx) => (
          <Todo key={todo.id} todo={todo} idx={idx} />
        ))}
      </tbody>
    </table>
  </>
);

ListTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoTypes)).isRequired,
};
