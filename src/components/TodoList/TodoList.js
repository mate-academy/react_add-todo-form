import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import NewTodo from '../NewTodo/NewTodo';
import './TodoList.css';

class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
  }

  addTodo = (title, userId) => {
    const todosLength = this.state.todos.length;

    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: todosLength + 1, title, userId: +userId,
      }],
    }));
  }

  render() {
    const { users } = this.props;
    const { todos } = this.state;

    return (
      <>
        <NewTodo users={users} addTodo={this.addTodo} />
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              <th className="table__column-head">Numder</th>
              <th className="table__column-head">Task</th>
              <th className="table__column-head">User id</th>
            </tr>
          </thead>
          <tbody className="table__head">
            <Todo todos={todos} />
          </tbody>
        </table>
      </>
    );
  }
}

TodoList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
};

export default TodoList;
