import React from 'react';
import PropTypes from 'prop-types';
import './toDo.css';
import ClassNames from 'classnames';

const ToDoList = ({ toDos, changeCompleted }) => (
  <div className="todo">
    {toDos.map(toDo => (
      <div key={toDo.id} className="todo__item">
        <div>
          {`Performer: ${toDo.user}`}
        </div>
        <p>{toDo.title}</p>
        <label className={
          ClassNames('todo__status', { todo__statusTrue: toDo.completed })
        }
        >
          Task status:
          <input
            type="checkbox"
            checked={toDo.completed}
            onChange={() => (changeCompleted(toDo.id))}
          />
        </label>
      </div>
    ))}
  </div>
);

ToDoList.propTypes = {
  toDos: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    },
  )).isRequired,
  changeCompleted: PropTypes.func.isRequired,
};

export default ToDoList;
