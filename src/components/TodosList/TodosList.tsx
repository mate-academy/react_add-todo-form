import React from 'react';
import { Todo } from '../../types/todo';
import { TodoListItem } from '../TodoListItem/TodoListItem';

type Props = {
  todos: Todo[]
};
type State = {};

export class TodosList extends React.Component<Props, State> {
  state = {};

  render() {
    const { todos } = this.props;

    return (
      <ul className="TodoList">
        {
          todos.map(todo => (
            <TodoListItem key={todo.id} todo={todo} />
          ))
        }
      </ul>
    );
  }
}
