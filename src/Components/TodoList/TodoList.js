import React, { Component } from 'react';
import { AddNewTodo } from '../AddNewTodo/AddNewTodo';
import { Todos } from '../Todos/Todos';
import { NamesShape } from '../../shapes/Shapes';
import styles from './TodoList.module.css';

export class TodoList extends Component {
  state = {
    todos: this.props.list,
  }

  addTodoHandler = (newTodo) => {
    this.setState(prevState => (
      { todos: [...prevState.todos, newTodo] }
    ));
  }

  render() {
    const { todos } = this.state;
    const { names } = this.props;

    return (
      <div className={styles.list}>
        <AddNewTodo names={names} addTodo={this.addTodoHandler} />
        <Todos todos={todos} />
      </div>
    );
  }
}

TodoList.propTypes = NamesShape.isRequired;
