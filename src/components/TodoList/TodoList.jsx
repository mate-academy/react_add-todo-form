import React from 'react';
import { Todo } from '../Todo/Todo';
import '../TodoList/TodoList.css';

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
    );
  };
};

