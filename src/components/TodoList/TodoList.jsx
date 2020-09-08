import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo/Todo';

export class TodoList extends React.Component {

  render() {
    const {todos} = this.props;
  
    return (
      <ul className="todo__list">
      {
        todos.map(todo => (
          <Todo todo={todo} key={todo.id}/>
        ))
      }
      </ul>
    )
  }
}

