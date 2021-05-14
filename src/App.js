/* eslint-disable object-shorthand */
import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import Form from './components/Form/Form';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    todoList: todos.map(todo => (
      {
        ...todo,
        user: users.find(user => todo.userId === user.id),
      }
    )),
  }

  addTodo = (userId, title) => {
    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          title,
          id: state.todoList.length + 1,
          user: users.find(user => user.id === parseFloat(userId)),
          userId: parseFloat(userId),
          completed: false,
        },
      ],
    }));
  }

  render() {
    const { todoList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form users={users} addTodo={this.addTodo} />
        <TodoList preparedTodos={todoList} />
      </div>
    );
  }
}

export default App;
