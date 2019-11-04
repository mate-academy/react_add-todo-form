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
  return todosAll.map((todo) => {
    const todoUsers = { ...todo, user: singleUser.find(user => user.id === todo.userId) };

    return todoUsers;
  });
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
    this.setState(prev => ({
      ...prev,
      todos: [...prev.todos, newItem],
    }));
  }

  render() {
    return (
      <div id="wrapper">
        <InputForm
          users={users}
          todos={this.state.todos}
          onSubmitted={this.newItemSubmitted}
          customMenu={customMenu}
        />
        <table className="todo ui celled table">
          <thead className="thead">
            <th>N</th>
            <th>Task</th>
            <th>User</th>
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
