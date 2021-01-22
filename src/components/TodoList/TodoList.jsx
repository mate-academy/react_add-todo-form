import React from 'react';
import './TodoList.css';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const TodoList = ({ todoList }) => (
  <div className="todolist">
    <h1>TodoList</h1>
    <div>
      <Table>
        <thead>
          <tr>
            <th>Todo name</th>
            <th>User name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map(elem => (
            <tr key={elem.id}>
              <td>
                {elem.title.length > 20
                  ? `${elem.title.slice(0, 20)}...` : elem.title}
              </td>
              <td>{elem.user.name}</td>
              <td>{elem.completed ? 'Finished' : 'In progress'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* eslint-disable-next-line no-console */}
      {console.log(todoList)}
    </div>
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  })).isRequired,
};
