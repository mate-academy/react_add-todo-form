import React from 'react';
import './App.css';

import users from './api/users';
import { Form } from './api/components/Form';
import { TodoList } from './api/components/TodoList';

export class App extends React.Component {
  state = {
    todoList: [],
  }

  updateTodoList = (todos) => {
    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          ...todos, id: state.todoList.length + 1,
        },
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <Form
          users={users}
          updateTodoList={this.updateTodoList}
        />
        <TodoList todoList={this.state.todoList} />
      </div>
    );
  }
}

export default App;
