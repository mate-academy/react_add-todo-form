import React from 'react';
import PropTypes from 'prop-types';
import NewTodo from './NewTodo';
import { Todo } from './Todo';

class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
    users: [...this.props.users],
  }

  addTodo = (title, userId) => {
    const todosLength = this.state.todos.length;
    const { users } = this.props;

    this.setState(prev => ({
      todos: [...prev.todos, {
        id: todosLength + 1,
        title,
        completed: false,
        user: users.find(user => user.id === userId),
      }],
    }));
  }

  render() {
    const { todos, users } = this.state;

    return (
      <>
        <div className="todoList">
          {todos.map(todo => (
            <Todo
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              user={todo.user.name}
            />
          ))}
        </div>
        <NewTodo addTodo={this.addTodo} users={users} />
      </>

    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
