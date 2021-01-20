import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export class TodoList extends React.PureComponent {
  render() {
    const { todos } = this.props;

    return (
      <div className="todos_list">
        {todos.map(todo => (
          <Todo todo={todo} name={todo.user.name} key={todo.id} />
        ))}
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
  })).isRequired,
};
