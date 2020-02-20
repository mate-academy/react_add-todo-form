import React from 'react';
import PropTypes from 'prop-types';
import 'bulma';
import './ListTodo.scss';
import { Todo } from '../Todo/Todo';

export const ListTodo = ({ filteredList }) => (
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
        {filteredList.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))
        }
      </tbody>
    </table>
  </>
);

ListTodo.propTypes = {
  filteredList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
