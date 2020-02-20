import React from 'react';
import PropTypes from 'prop-types';
import NewTodo from '../NewTodo/NewTodo';
import './TodoList.css';

class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
  };

  addTodo = (newTodo) => {
    if (!(newTodo.userId === 0 || newTodo.title === '')) {
      this.setState(prevState => ({
        todos: [...prevState.todos, newTodo],
      }));
    }
  };

  render() {
    const { todos } = this.state;

    return (
      <div>
        <NewTodo addTodo={this.addTodo} />
        <table className="table">
          <thead>
            <tr>
              <th className="table--row">№</th>
              <th className="table--row">Title</th>
              <th className="table--row">id</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id}>
                <td className="table--row">{index}</td>
                <td className="table--row">{todo.title}</td>
                <td className="table--row">{todo.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
};

export default TodoList;
