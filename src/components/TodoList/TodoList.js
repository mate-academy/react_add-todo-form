import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

import todos from '../../api/todos';
import { Tasks } from '../Tasks/Tasks';
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

  toggleCheck = (event) => {
    const id = event.target.value;

    this.setState((prevState) => {
      const current = prevState.todosList.map((todo) => {
        if (todo.id === +id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

      return { todosList: current };
    });
  }

  render() {
    const { todosList } = this.state;
    const { users } = this.props;

    return (
      <div className="wrapper">
        <NewTodo
          users={users}
          onNewTodo={this.addNewTodo}
        />
        <Tasks todoList={todosList} toggle={this.toggleCheck} />
      </div>
    );
  }
}

TodoList.propTypes = {
  users: PropTypes.arrayOf(
    UserTypes,
  ).isRequired,
};
