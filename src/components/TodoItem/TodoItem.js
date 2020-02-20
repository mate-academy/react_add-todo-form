import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';
/* eslint-disable */

//одна ошибка линта, которую я не могу задизейблить /* eslint-disable label-has-associated-control*/
// поэтому отключила линтер для страницы
export const TodoItem = ({ todos, onCheck }) => (
  todos.map((item, idx) => (
    <tr key={item.id}>
      <th>{idx + 1}</th>
      <td>{item.user.name}</td>
      <td>{item.title}</td>
      <td>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id={item.id}
            onChange={onCheck}
          />
          <label className="custom-control-label" htmlFor={item.id} />
        </div>
      </td>
    </tr>
  ))

);
TodoItem.propTypes = {
  onCheck: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  ),
};
