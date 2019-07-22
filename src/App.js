import React from 'react';
import './App.css';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todoList: [],
  };

  componentDidMount() {
    const todoList = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    this.setState({ todoList });
  }

  addTodo = (todo) => {
    const { userId, title } = todo;

    this.setState((prevState) => {
      const { todoList } = prevState;
      const newTodo = {
        userId: +userId,
        title,
        id: todoList.length + 1,
        completed: false,
        user: users.find(user => user.id === +userId),
      };

      return {
        todoList: [
          ...todoList,
          newTodo,
        ],
      };
    });
  };

  render() {
    const { todoList } = this.state;

    return (
      <main className="App">
        <h1>Add task to list of todos</h1>
        <NewTodo
          addTodo={this.addTodo}
          users={users}
        />
        <TodoList
          todos={todoList}
        />
      </main>
    );
  }
}

export default App;
