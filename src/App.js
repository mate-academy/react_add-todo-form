import React from 'react';
import './App.css';
import propTypes from 'prop-types';
import users from './api/users';
import todos from './api/todos';
import NewTodo from './NewTodo';

const todoList = [...todos];
const todosWithUser = todoList.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosWithUser,
  };

  addToList = (data) => {
    todosWithUser.push(data);
    this.setState({
      todos: todosWithUser.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })),
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>

        <TodoList
          todos={this.state.todos}
        />
        <NewTodo
          todos={this.state.todos}
          update={this.addToList}
        />
      </div>
    );
  }
}

const TodoList = props => (
  <table>
    {props.todos.map((todo, index) => (
      <TodoItem key={todo.title} todo={todo} id={index + 1} />
    ))}
  </table>
);

const TodoItem = ({ todo, id }) => (
  <tr>
    <td>
      {id}
    </td>
    <td>
      {todo.title}
    </td>
    <td>
      <User user={todo.user} />
    </td>
    <td>
      <label htmlFor="checked">
        <input
          name="checked"
          type="checkbox"
          checked={todo.completed}
        />
      </label>
    </td>
  </tr>
);

const User = props => (
  <div>{props.user.name}</div>
);

TodoList.propTypes = {
  todos: propTypes.arrayOf(propTypes.object).isRequired,
};
TodoItem.propTypes = {
  id: propTypes.number.isRequired,
  todo: propTypes.shape({
    completed: propTypes.bool,
    title: propTypes.string,
  }).isRequired,
};
User.propTypes = {
  user: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
  }).isRequired,
};

export default App;
