import React, { Component } from 'react';
import { AddNewTodo } from '../AddNewTodo/AddNewTodo';
import { Todos } from '../Todos/Todos';
import { NamesShape } from '../../shapes/Shapes';

export class TodoList extends Component {
  state = {
    todos: this.props.list,
  }

  render() {
    const { todos } = this.state;
    const { names } = this.props;

    return (
      <div>
        <AddNewTodo names={names} />
        <Todos todos={todos} />

      </div>
    );
  }
}

TodoList.propTypes = NamesShape.isRequired;
