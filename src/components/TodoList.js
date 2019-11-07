import React, { Component } from 'react';
import todos from '../api/todos';
import users from '../api/users';
import TodoItem from './TodoItem';
import InputForm from './InputForm';

const customMenu = users.map((item) => {
  const menu = { key: item.id, text: item.name, value: item.name };

  return menu;
});

function getTodoWithUsers(todosAll, singleUser) {
  return todosAll.map(todo => (
    {
      ...todo,
      user: singleUser.find(user => user.id === todo.userId),
    }));
}

const initialTodo = getTodoWithUsers(todos, users);

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [...customMenu],
      todos: [...initialTodo],
      task: '',
      userValue: null,
      errorTask: null,
      errorUser: null,
    };
  }

  newItemSubmitted = (newItem) => {
    const item = {
      ...newItem,
      id: this.state.todos.length + 1,
    };

    this.setState(prev => ({
      ...prev,
      todos: [
        ...prev.todos, item],
    }));
  }

  render() {
    return (
      <div className="wrapper">
        <InputForm
          users={users}
          todos={this.state.todos}
          onSubmitted={this.newItemSubmitted}
          customMenu={customMenu}
        />
        <table className="todo ui celled table">
          <thead className="thead">
            <tr>
              <th>N</th>
              <th>Task</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TodoList;
