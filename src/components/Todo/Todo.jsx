/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';

import './Todo.scss';

export class Todo extends React.Component {
  state = {
    ...this.props.todo,
  };

  handleClick = (event) => {
    this.setState(state => ({
      completed: !state.completed,
    }));

    this.props.checkForCompleted(+event.target.value);
  }

  render() {
    const { completed, title, id } = this.state;

    return (

      <>
        <p className={classNames(
          'todo__title',
          { 'todo__title--is-completed': completed },
        )}
        >

          {title}
        </p>

        <button
          type="button"
          className={classNames(
            'todo__status',
            { 'todo__status--is-completed': completed },
          )}
          value={id}
          onClick={this.handleClick}
        />

      </>
    );
  }
}
