import React from 'react';
import classNames from 'classnames';

import { About } from '../About/About';
import { TodosList } from '../TodosList';

import './Card.scss';

export class Card extends React.PureComponent {
  state = {
    ...this.props,
  }

  checkForCompleted = (value) => {
    const { todosList } = this.state;

    const index = todosList.findIndex(todo => todo.id === value);
    const todo = todosList.splice(index, 1)[0];

    todosList.splice(index, 0, {
      ...todo, completed: !todo.completed,
    });

    this.forceUpdate();
  }

  handleComplededStatus() {
    return this.state.todosList.every(todo => todo.completed);
  }

  render() {
    const { user, todosList } = this.state;

    return (
      <span
        key={user.id}
        className={classNames(
          'card',
          { 'card--is-completed': this.handleComplededStatus() },
        )}
      >
        <About {...user} />
        <TodosList
          todosList={todosList}
          checkForCompleted={this.checkForCompleted}
        />
      </span>
    );
  }
}
