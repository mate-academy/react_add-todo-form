import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

const getTodoWithUser = currentTodo => ({
  ...currentTodo,
  user: users.find(user => user.id === currentTodo.userId),
});

const preparedTodos = todos.map(todo => getTodoWithUser(todo));

class App extends React.Component {
  state = {
    todoList: preparedTodos,
  }

  handleStatus = (id) => {
    this.setState((prevState) => {
      const newTodoList = prevState.todoList.map((item) => {
        const currentItem = item;

        if (currentItem.id === +id) {
          currentItem.completed = !item.completed;
        }

        return currentItem;
      });

      return { todoList: newTodoList };
    });
  };

  addTodo = todo => (
    this.setState(prevState => ({
      todoList: [...prevState.todoList, todo],
    }))
  )

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Todos: </span>
          {this.state.todoList.length}
        </p>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <div className="content">
          <NewTodo
            addTodo={this.addTodo}
            todoList={this.state.todoList}
          />
          <br />
          <TodoList
            preparedTodos={this.state.todoList}
            handleStatus={this.handleStatus}
          />
        </div>
      </div>
    );
  }
}

export default App;
