import React from 'react';
import PropTypes from 'prop-types';
import './todoList.css';
import { ToDo } from '../ToDo';
import { TodoType } from '../../types';

export function ToDoList({ listOfTodos }) {
  return (
    <div className="todo-list">
      <h2>To Do List:</h2>

      {listOfTodos.map((user, index) => {
        if (user.todo.length > 0) {
          return (
            <div
              className="todo-list__todos"
              key={user.id}
            >
              <p>
                { 'User ' }
                <span className="todo-list__username">
                  {user.name}
                  {' '}
                </span>
                needs to:
              </p>
              {listOfTodos[index].todo.map(item => (
                <ToDo item={item} key={item.id} />
              ))}
            </div>
          );
        }

        return false;
      })}

    </div>
  );
}

ToDoList.propTypes = {
  listOfTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      todo: PropTypes.arrayOf(
        TodoType,
      ),
    }),
  ),
};

ToDoList.defaultProps = {
  listOfTodos: [],
};
