import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import './TodoList.css';

class TodoList extends PureComponent {
  render() {
    const { todoList, deleteTodo, statusToggle } = this.props;
    const completedTodos = [];
    const uncompletedTodos = [];

    todoList.forEach((todo) => {
      if (todo.completed) {
        completedTodos.push(todo);
      } else {
        uncompletedTodos.push(todo);
      }
    });

    return (
      <>
        <div className="todo__title">
          Current tasks
        </div>
        <ul className="todo__list">
          {uncompletedTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              statusToggle={statusToggle}
            />
          ))}
        </ul>
        <div className="todo__title">
          Completed tasks
        </div>
        <ul className="todo__list">
          {completedTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              statusToggle={statusToggle}
            />
          ))}
        </ul>
      </>
    );
  }
}

TodoList.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  statusToggle: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default TodoList;
