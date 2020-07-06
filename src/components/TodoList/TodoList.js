import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

import todos from '../../api/todos';
import { NewTasks } from '../NewTasks/NewTasks';
import { NewTodo } from '../NewTodo/NewTodo';
import { UserTypes } from '../Shapes/ShapesTypes';

export class TodoList extends React.Component {
  state = {
    todosList: todos,
  }

  addNewTodo = (newTodo) => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList, newTodo],
    }));
  }

  render() {
    const { todosList } = this.state;
    const { users } = this.props;

    return (
      <div className="wrapper">
        <NewTodo
          onNewTodo={this.addNewTodo}
          users={users}
        />
        <NewTasks todoList={todosList} toggle={this.toggleCheck} />
      </div>
    );
  }
}

TodoList.propTypes = {
  users: PropTypes.arrayOf(
    UserTypes,
  ).isRequired,
};
